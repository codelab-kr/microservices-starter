import MailemailConfig = require('nodemailer/lib/mailer');
import * as nodemailer from 'nodemailer';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { emailConfig, testEmailConfig } from './emailConfig';
import { HealthIndicatorResult } from '@nestjs/terminus';
import { EmailOptions } from './email.options';
import { CronJob } from 'cron';
import { SchedulerRegistry } from '@nestjs/schedule';
import { IcalAttachment } from 'nodemailer/lib/mailer';
import * as ics from 'ics';

@Injectable()
export class EmailService {
  private transporter: MailemailConfig;

  constructor(
    private readonly logger: Logger,
    @Inject(
      process.env.NODE_ENV === 'test' ? testEmailConfig.KEY : emailConfig.KEY,
    )
    private readonly config:
      | ConfigType<typeof emailConfig>
      | ConfigType<typeof testEmailConfig>,

    private readonly schedulerRegistry: SchedulerRegistry,
  ) {
    this.transporter = nodemailer.createTransport(this.config);
  }

  async pingCheck(key: string): Promise<HealthIndicatorResult> {
    let status: 'up' | 'down' = 'down';
    try {
      status = (await this.transporter.verify()) ? 'up' : 'down';
      return { [key]: { status } };
    } catch (error) {
      this.logger.error(error);
      throw new Error(error);
    }
  }

  async sendMemberJoinVerification(
    emailAdrress: string,
    signupVerifyToken: string,
  ) {
    const baseUrl = this.config.baseUrl;

    const url = `${baseUrl}/users/email-verify?signupVerifyToken=${signupVerifyToken}`;

    const mailOptions: EmailOptions = {
      to: emailAdrress,
      subject: '가입 인증 메일',
      html: `
        가입확인 버튼을 누르시면 가입 인증이 완료됩니다.<br />
        <form action="${url}" method="POST">
          <button>가입확인</button>
        </form>
      `,
    };
    return await this.transporter.sendMail(mailOptions);
  }

  async sendEmail(emailOptions: EmailOptions) {
    await this.transporter.sendMail(emailOptions);
  }

  async addEmailJob(
    emailOptions: EmailOptions,
    cronJobName: string,
    cronTime: string,
  ) {
    const job = new CronJob(
      cronTime,

      () => this.transporter.sendMail(emailOptions),
    );
    this.schedulerRegistry.addCronJob(cronJobName, job as any);
  }

  async sendIcs(emailOptions: EmailOptions, event: ics.EventAttributes) {
    ics.createEvent(event, (e, v) => {
      emailOptions.attachments = [
        {
          filename: 'event.ics',
          method: 'request',
          content: v,
        },
      ] as IcalAttachment[];
      this.transporter.sendMail(emailOptions);
    });
  }
}

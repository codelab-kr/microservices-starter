import { IcalAttachment } from 'nodemailer/lib/mailer';

export interface EmailOptions {
  to: string;
  subject: string;
  html?: string;
  text?: string;
  attachments?: IcalAttachment[];
}

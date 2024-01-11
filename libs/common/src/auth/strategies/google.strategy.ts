import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { NATS_SERVICE } from '../../constant/services';
import { ClientProxy } from '@nestjs/microservices';
import { Profile, Strategy } from 'passport-google-oauth20';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    @Inject(NATS_SERVICE) private readonly natsService: ClientProxy,
  ) {
    super({
      clientID: configService.get('GOOLGE_CLIENT_ID'),
      clientSecret: configService.get('GOOGLE_CLIENT_SECRET'),
      callbackURL: 'http://localhost:4000/google',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: any,
  ) {
    const { id, displayName, emails, photos } = profile;
    // console.log('accessToken', accessToken);
    // console.log('refreshToken', refreshToken);
    // console.log('profile', profile);
    const user = {
      email: emails[0].value,
      username: displayName,
      providerId: id,
      photo: photos[0].value,
    };
    let userFound: any;
    try {
      userFound = await lastValueFrom(
        this.natsService.send({ cmd: 'getOrSaveUser' }, user),
      );
    } catch (error) {
      console.log('error', error);
    }
    if (!userFound) {
      return done(null, user);
    }
    done(null, userFound);
    return user;
  }
}

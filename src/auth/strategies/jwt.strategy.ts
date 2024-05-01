import { IAuthPayload } from '@auth/types';
import appConfig from '@config/app.config';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject(appConfig.KEY) private appConf: ConfigType<typeof appConfig>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: appConf.secret,
    });
  }

  async validate(payload: IAuthPayload) {
    return payload;
  }
}

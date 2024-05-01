import { appConfig } from '@config/index';
import { Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';

export class JwtConfigService implements JwtOptionsFactory {
  constructor(@Inject(appConfig.KEY) private appConf: ConfigType<typeof appConfig>) {}

  createJwtOptions(): JwtModuleOptions {
    return {
      secret: this.appConf.secret,
      signOptions: { expiresIn: this.appConf.jwtExpiresIn },
    };
  }
}

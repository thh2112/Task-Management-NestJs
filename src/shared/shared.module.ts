import { Global, Module } from '@nestjs/common';
import * as _ from 'lodash';
import * as providers from '@shared/providers';

@Global()
@Module({
  providers: _.values(providers),
  exports: _.values(providers),
})
export class SharedModule {}

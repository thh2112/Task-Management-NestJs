import { Module } from '@nestjs/common';
import { HashService } from './providers';

@Module({
  providers: [HashService],
  exports: [HashService],
})
export class SecurityModule {}

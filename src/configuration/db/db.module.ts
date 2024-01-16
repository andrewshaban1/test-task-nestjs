import { Module } from '@nestjs/common';
import { DBService } from './db.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [DBService],
})
export class DBModule {}

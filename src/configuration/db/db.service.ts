import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DataSourceOptions, EntitySchema } from 'typeorm';
import { UserEntity } from 'src/entities/user.entity';

@Injectable()
export class DBService {
  public readonly config: DataSourceOptions;

  constructor(private readonly configService: ConfigService) {
    this.config = {
      type: 'postgres',
      host: this.configService.get<string>('DB_HOST'),
      port: this.configService.get<number>('DB_PORT'),
      username: this.configService.get<string>('POSTGRES_SERVER_USER'),
      password: this.configService.get<string>('POSTGRES_PASSWORD'),
      database: this.configService.get<string>('POSTGRES_DB_NAME'),
      entities: [UserEntity],
      synchronize: false,
    };
  }
}

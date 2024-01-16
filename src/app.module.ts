import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DBModule } from './configuration/db/db.module';
import { DBService } from './configuration/db/db.service';
import { configValidationSchma } from './configuration/config.schema';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './middlewares/auth.middlware';

@Module({
  imports: [
    AuthModule,
    DBModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: configValidationSchma,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        new DBService(configService).config,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}

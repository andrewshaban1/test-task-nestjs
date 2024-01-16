import { Injectable, NestMiddleware } from '@nestjs/common';
import { ExpressRequestInterface } from '../types/expressRequest.interface';
import { verify } from 'jsonwebtoken';
import { NextFunction, Response } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {}
  async use(req: ExpressRequestInterface, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      req.user = null;
      next();
      return;
    }
    const token = req.headers.authorization;

    try {
      const decode = verify(
        token,
        this.configService.get<string>('JWT_SECRET'),
      );

      const user = await this.authService.findById(decode.id);
      req.user = user;
      next();
    } catch (error) {
      console.error(error);

      req.user = null;
      next();
    }
  }
}

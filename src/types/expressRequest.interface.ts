import { UserEntity } from '../entities/user.entity';
import { Request } from 'express';

export interface ExpressRequestInterface extends Request {
  user?: UserEntity;
}

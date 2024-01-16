import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { UserDto } from 'src/dto/user.dto';
import { UserEntity } from 'src/entities/user.entity';
import { UserResponseInterface } from 'src/types/userResponse.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async find(user: UserEntity): Promise<UserResponseInterface> {
    const existingUser = await this.userRepository.findOne({
      where: { id: user.id },
    });
    return this.buildUserResponse(existingUser);
  }

  async findById(id: number): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: { id },
    });
  }

  async register(user: UserDto): Promise<UserResponseInterface> {
    const existingUser = await this.userRepository.findOne({
      where: { email: user.email },
    });

    if (existingUser) {
      return this.buildUserResponse(existingUser);
    } else {
      const newUser = await this.userRepository.create(user);

      return this.buildUserResponse(await this.userRepository.save(newUser));
    }
  }

  generateJWT(user: UserEntity): string {
    return sign(
      { id: user.id, email: user.email },
      this.configService.get<string>('JWT_SECRET'),
    );
  }

  buildUserResponse(user: UserEntity): UserResponseInterface {
    return { user: { ...user, token: this.generateJWT(user) } };
  }

  async deleteById(id: number): Promise<any> {
    return await this.userRepository.delete({ id });
  }
}

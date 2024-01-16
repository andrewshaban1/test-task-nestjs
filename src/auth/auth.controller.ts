import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from 'src/dto/user.dto';
import { UserEntity } from 'src/entities/user.entity';
import { AuthGuard } from 'src/guards/auth.guard';
import { User } from 'src/decorators/user.decorator';
import { UserResponseInterface } from 'src/types/userResponse.interface';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async register(@Body('user') user: UserDto): Promise<UserResponseInterface> {
    return await this.authService.register(user);
  }

  @Get()
  @UseGuards(AuthGuard)
  async getUser(@User() user: UserEntity): Promise<UserResponseInterface> {
    return await this.authService.find(user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteUserById(@Param('id') id: number): Promise<any> {
    return await this.authService.deleteById(id);
  }
}

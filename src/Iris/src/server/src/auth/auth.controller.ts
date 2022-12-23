import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Routes, Services } from '../utils/types';
import { IAuthService } from './auth';
import { RegisterDTO } from './dto/Register.dto';

@Controller(Routes.AUTH)
export class AuthController {
  constructor(@Inject(Services.AUTH) private authService: IAuthService) {}

  @Post('register')
  register(@Body() registerDto: RegisterDTO) {
    console.log(registerDto);
  }

  @Post('login')
  login() {}

  @Get('status')
  status() {}

  @Post('logout')
  logout() {}
}

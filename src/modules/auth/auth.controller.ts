import { GetOneUserService } from './services/getOne-user.service';

import { RefreshTokenService } from './services/auth-refreshToken.service';
import { RefreshTokenDto } from './dto/refreshToken.dto';
import { VerifyOtpService } from './services/auth-verifyOtp.service';
import { VerifyOtpDto } from './dto/verifyOtp.dto';
import { RegisterDto } from './dto/register.dto';
import { LoginService } from './services/auth-login.service';
import { Controller, Get, Post, Body, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { FindAllUserDto } from './dto/findAll-user.dto';
import { FindAllUserService } from './services/findAll-users.service';
import { DeleteUserservice } from './services/delete-user.service';

@Controller('user')
export class AuthController {
  constructor(
    private loginService: LoginService,
    private verifyOtpService: VerifyOtpService,
    private refreshTokenService: RefreshTokenService,
    private findAllUserService:FindAllUserService,
    private deleteUserservice:DeleteUserservice,
    private getOneUserService:GetOneUserService,
    ) {}

  @Post('login')
  login(@Body() phoneNumber: RegisterDto) {
    return this.loginService.login(phoneNumber);
  }

  @Post('verify')
  verifyOtp(@Body() data: VerifyOtpDto){
    return this.verifyOtpService.verifyOtp(data)
  }
  @UseGuards(JwtAuthGuard)
  @Post('refresh')
  refresh(@Body() token: RefreshTokenDto){
    return this.refreshTokenService.refresh(token)
  }

  @Get()
  findAllUsers(@Query() findAllUserDto: FindAllUserDto) {
    return this.findAllUserService.findAllUser(findAllUserDto)
  }

  @Get(':id')
  getOne(@Param('id') id:string){
  return this.getOneUserService.getOne(id)    
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.deleteUserservice.delete(id)
  }
}

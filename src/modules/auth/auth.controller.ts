import { RefreshTokenService } from './services/auth-refreshToken.service';
import { RefreshTokenDto } from './dto/refreshToken.dto';
import { VerifyOtpService } from './services/auth-verifyOtp.service';
import { VerifyOtpDto } from './dto/verifyOtp.dto';
import { RegisterDto } from './dto/register.dto';
import { LoginService } from './services/auth-login.service';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private loginService: LoginService,
    private verifyOtpService: VerifyOtpService,
    private refreshTokenService: RefreshTokenService
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
  
  

  // @Post('login')
  // login(@Body() createAuthDto: CreateAuthDto) {
  //   return this.authService.create(createAuthDto);
  // }

  // @Get()
  // findAll() {
  //   return this.authService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.authService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //   return this.authService.update(+id, updateAuthDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.authService.remove(+id);
  // }
}


import { RefreshTokenService } from './services/auth-refreshToken.service';
import { VerifyOtpService } from './services/auth-verifyOtp.service';
import { LoginService } from './services/auth-login.service';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';


@Module({
  controllers: [AuthController],
  providers: [LoginService, VerifyOtpService, RefreshTokenService]
})
export class AuthModule {}

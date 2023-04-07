import { RefreshTokenService } from './services/auth-refreshToken.service';
import { VerifyOtpService } from './services/auth-verifyOtp.service';
import { LoginService } from './services/auth-login.service';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { FindAllUserService } from './services/findAll-users.service';
import { DeleteUserservice } from './services/delete-user.service';
import { GetOneUserService } from './services/getOne-user.service';
import { LogoutUserService } from './services/logout-user.service';

@Module({
    controllers: [AuthController],
    providers: [
        LoginService,
        VerifyOtpService,
        RefreshTokenService,
        FindAllUserService,
        DeleteUserservice,
        GetOneUserService,
        LogoutUserService
    ],
})
export class AuthModule {}

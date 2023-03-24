import { TokenService } from './auth-token.service';
import { VerifyOtpDto } from '../dto/verifyOtp.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
const bcrypt = require('bcrypt');
@Injectable()
export class VerifyOtpService extends TokenService{
    async verifyOtp(data: VerifyOtpDto) {
        const { phone, otp } = data;
        const user = await User.findOneBy({ phone: phone });
        const {accessToken,refreshToken} = await this.generateRefreshAndAccessToken(user.id)
        const hashedRefreshToken = await bcrypt.hash(refreshToken,10)
        if(otp != user.verificationCode){
            return new HttpException('Telefon raqamini tasdiqlash kodi noto\'g\'ri', HttpStatus.BAD_REQUEST)
        }
        User.update(user.id, {isVerified: true, hashedRefreshToken: hashedRefreshToken})
        return {accessToken,refreshToken}
    }
}

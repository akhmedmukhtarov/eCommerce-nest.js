import { User } from './../entities/user.entity';
import { RefreshTokenDto } from '../dto/refreshToken.dto';
import { TokenService } from './auth-token.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpError } from 'src/common/error/http.error';
require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

@Injectable()
export class RefreshTokenService extends TokenService {
    async refresh(token: RefreshTokenDto) {
        try {
            const { refreshToken } = token;
            const decryptedToken = await jwt.verify(
                refreshToken,
                process.env.REFRESH_TOKEN_SECRET,
            );
            const { id } = decryptedToken;
            const user = await User.findOneBy({ id });
            if(!user.hashedRefreshToken){
                throw new HttpException('User have logged out', HttpStatus.NOT_ACCEPTABLE)
            }
            const result = await bcrypt.compare(
                refreshToken,
                user.hashedRefreshToken,
            );
            if (result) {
                const { accessToken } =
                    await this.generateRefreshAndAccessToken(id);
                return { accessToken };
            }
        } catch (err) {
            throw new HttpError(err)
        }
    }
}

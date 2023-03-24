import { User } from './../entities/user.entity';
import { RefreshTokenDto } from '../dto/refreshToken.dto';
import { TokenService } from './auth-token.service';
import { Injectable } from '@nestjs/common';
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
            throw err
        }
    }
}

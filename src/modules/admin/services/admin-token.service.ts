import { Injectable } from '@nestjs/common';
const jwt = require('jsonwebtoken');

@Injectable()
export class AdminTokenService {
    async generateRefreshAndAccessToken(id: number) {
        try {
            const refreshToken = jwt.sign(
                { id },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '180d' },
            );
            const accessToken = jwt.sign(
                { id },
                process.env.ACCESS_TOKEN_SECRET,
                {
                    expiresIn: '30m',
                },
            );
            return { refreshToken, accessToken };
        } catch (err) {
            console.log(err);
        }
    }
}

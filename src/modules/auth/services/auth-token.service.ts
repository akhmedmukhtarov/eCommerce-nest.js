import { Injectable } from '@nestjs/common';
const jwt = require('jsonwebtoken');

@Injectable()
export class TokenService {
    async generateRefreshAndAccessToken(id: number) {
        try {
            const refreshToken = jwt.sign(
                { id, role: "user"},
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '180d' },
            );
            const accessToken = jwt.sign(
                { id, role: "user" },
                process.env.ACCESS_TOKEN_SECRET,
                {
                    expiresIn: '30m',
                },
            );
            return { refreshToken, accessToken };
        } catch (err) {
            throw err;
        }
    }
}

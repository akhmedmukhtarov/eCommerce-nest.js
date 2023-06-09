import { Injectable } from '@nestjs/common';
const jwt = require('jsonwebtoken');

@Injectable()
export class AdminTokenService {
    async generateRefreshAndAccessToken(id: number, role: string) {
        try {
            const refreshToken = jwt.sign({ id, role }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '180d' });
            const accessToken = jwt.sign({ id, role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' });
            return { refreshToken, accessToken };
        } catch (err) {
            throw err;
        }
    }
}

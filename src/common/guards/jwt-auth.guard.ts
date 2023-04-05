import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
const jwt = require('jsonwebtoken');
require('dotenv');

@Injectable()
export class JwtAuthGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const req = context.switchToHttp().getRequest();
            
            const token =
                req.headers['authorization'] &&
                req.headers.authorization.split(' ')[1];
            const decryptedToken = jwt.verify(
                token,
                process.env.ACCESS_TOKEN_SECRET,
            );
            if (decryptedToken.id) {
                req.id = decryptedToken.id;
                req.role = decryptedToken.role
                return true;
            } else {
                throw new UnauthorizedException()
            }
        } catch (err) {
            throw err
        }
    }
}

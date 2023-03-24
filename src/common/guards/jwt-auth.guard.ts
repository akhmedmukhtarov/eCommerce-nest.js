import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
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
            if (req.id) {
                req.id = decryptedToken.id;
                return true;
            } else {
                return false;
            }
        } catch (err) {
            console.log(err);
        }
    }
}

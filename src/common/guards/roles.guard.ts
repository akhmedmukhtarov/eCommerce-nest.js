import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        const request = context.switchToHttp().getRequest();
        if (!roles) {
            if(request.role === 'user'){
                return false
            }
            return true;
        }
        return roles.includes(request.role)
        
    }

    // async canActivate(context: ExecutionContext): Promise<boolean> {
    // const req = context.switchToHttp().getRequest();
    // const token = req.headers['authorization'] && req.headers.authorization.split(' ')[1];
    // const decryptedToken = await  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    // if(decryptedToken)

    // return true;
    // }
}

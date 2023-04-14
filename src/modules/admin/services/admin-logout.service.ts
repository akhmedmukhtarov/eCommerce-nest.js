import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Admin } from '../entities/admin.entity';
import { HttpError } from 'src/common/error/http.error';

@Injectable()
export class AdminLogoutService {
    async logout(req: any) {
        try {
            if (req.role === 'user') {
                throw new HttpException('You have no right to logout admin or moderator', HttpStatus.NOT_ACCEPTABLE);
            }
            const result = await Admin.update({ id: req.id }, { hashedRefreshToken: null });
        } catch (error) {
            throw error
        }
    }
}

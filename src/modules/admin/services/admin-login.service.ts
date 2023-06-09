import { AdminLoginDto } from './../dto/adminLogin.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AdminTokenService } from './admin-token.service';
import { Admin } from '../entities/admin.entity';
const bcrypt = require('bcrypt');

@Injectable()
export class AdminLoginService extends AdminTokenService {
    async adminLogin(adminLoginDto: AdminLoginDto) {
        try {
            const { username, password } = adminLoginDto;
            // const hashedPassword = await bcrypt.hash(password, 10)
            // const a = Admin.create({username,hashedPassword,role:'admin'})
            // await a.save()
            const admin = await Admin.findOneBy({ username });
            if(!admin){
                throw new HttpException('Admin/moderator with username: ' + username+ ' not found', HttpStatus.BAD_REQUEST)
            }
            
            const result = await bcrypt.compare(password, admin.hashedPassword);
            
            if (!result) {
                throw new HttpException(
                    'Wrong username/password',
                    HttpStatus.BAD_REQUEST,
                );
            }
            const { accessToken, refreshToken } =
                await this.generateRefreshAndAccessToken(admin.id,admin.role);
            const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
            Admin.update(admin.id, { hashedRefreshToken });
            return { accessToken, refreshToken };
        } catch (err) {
            throw err
        }
    }
}

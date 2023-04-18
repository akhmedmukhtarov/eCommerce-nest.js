import { Admin } from './../entities/admin.entity';
import { AdminRefreshTokenDto } from './../dto/adminRefreshToken.dto';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { AdminTokenService } from './admin-token.service';
import { HttpError } from 'src/common/error/http.error';
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
require("dotenv").config()

@Injectable()
export class AdminRefreshTokenService extends AdminTokenService{
    async refresh(adminRefreshTokenDto: AdminRefreshTokenDto){
        try{
            const {refreshToken} = adminRefreshTokenDto
            const decryptedRefreshToken = await jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
            const admin = await Admin.findOneBy({id:decryptedRefreshToken.id})
            const result = await bcrypt.compare(refreshToken, admin.hashedRefreshToken)
            if(result){
                const {accessToken} = await this.generateRefreshAndAccessToken(admin.id,admin.role)
                return {accessToken}
            }else{
                return new HttpException('', HttpStatus.UNAUTHORIZED)
            }
        }catch(err){
            throw new HttpError(err)
        }

    }
}
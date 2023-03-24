import { RegisterDto } from '../dto/register.dto';
import { User } from '../entities/user.entity';
import { SmsSenderConfig } from '../../../common/configs/smsSender.config';
import * as dotenv from 'dotenv';
import { Injectable } from '@nestjs/common';
const axios = require('axios');

dotenv.config();

@Injectable()
export class LoginService {
    async login(phoneNumber: RegisterDto) {
        try {
            const { phone } = phoneNumber;
            const otp = Math.floor(Math.random() * 1000000);
            const config = new SmsSenderConfig(phone, otp);
            // axios.post(process.env.SMS_SENDER_URL, config);
            User.upsert(
                [{ phone: phone, verificationCode: otp }],
                ['verificationCode'],
            );
        } catch (err) {
            throw err
        }
    }
}

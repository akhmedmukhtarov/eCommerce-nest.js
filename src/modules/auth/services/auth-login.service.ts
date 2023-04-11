import { RegisterDto } from '../dto/register.dto';
import { User } from '../entities/user.entity';
import { Injectable } from '@nestjs/common';
import { SmsSenderConfig } from 'src/common/configs/smsSender.config';
import { sendSms } from 'src/common/utils/smsSender.util';
const axios = require('axios');
const http = require('http')
require('dotenv').config()



@Injectable()
export class LoginService {
    async login(phoneNumber: RegisterDto) {
        try {
            const { phone } = phoneNumber;
            console.log(phone);
            console.log(process.env.SMS_SENDER_URL);
            
            const otp = Math.floor(Math.random() * 1000000);
            const config = new SmsSenderConfig(phone, otp);
            // await sendSms(phone,otp)
            axios.post("https://sms-api.main-gate.appx.uz/sendOne", config);
            User.upsert([{ phone: phone, verificationCode: otp }], ['verificationCode']);
        } catch (err) {
            throw err;
        }
    }
}

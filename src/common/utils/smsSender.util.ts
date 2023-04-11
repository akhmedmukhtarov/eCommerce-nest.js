const axios = require('axios');
require('dotenv').config()
export const sendSms = async (phone: string, otp: number): Promise<boolean> => {
    try {
        const sms = await axios.post(
            process.env.SMS_SENDER_URL,
            { phone, text: `${otp} : ushbu maxfiy kod sizga sdb.uz tomonidan yuborildi`, user: 'SDB' },
            { timeout: 10000 },
        );
        return sms.data.success == true;
    } catch (error) {
        console.log('AxiosError: ' + error.message);
        return false;
    }
};

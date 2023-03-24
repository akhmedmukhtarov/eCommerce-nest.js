export class SmsSenderConfig {
    constructor(phoneNumber: string, otp: number) {
        this.phone = phoneNumber;
        this.text = `${otp} : ushbu maxfiy kod sizga sdb.uz tomonidan yuborildi`
    }
    phone: string 
    text: string
    user = 'sdb.uz';
}

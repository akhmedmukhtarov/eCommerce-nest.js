import { Injectable } from "@nestjs/common";
import { User } from "../entities/user.entity";

@Injectable()
export class LogoutUserService{
    async logout(req:any){
        try {
            const result = User.update({id: +req.id}, {hashedRefreshToken: null})
            return result
        } catch (error) {
            throw error
        }
    }
}
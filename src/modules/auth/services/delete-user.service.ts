import { Injectable } from "@nestjs/common";
import { User } from "../entities/user.entity";

@Injectable()
export class DeleteUserservice{
    async delete(id: string){
        try {
            const result = await User.delete({id: +id})
            return result
        } catch (error) {
            throw error
        }
    }
}
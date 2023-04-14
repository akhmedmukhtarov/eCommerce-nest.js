import { Injectable, NotFoundException } from "@nestjs/common";
import { User } from "../entities/user.entity";

@Injectable()
export class DeleteUserservice{
    async delete(id: string){
        try {
            const user = await User.findOneBy({id: +id})
            if(!user){
                throw new NotFoundException(`User with id: '${id}' not found`)
            }
            const result = await User.delete({id: +id})
        } catch (error) {
            throw error
        }
    }
}
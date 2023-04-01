import { Injectable } from "@nestjs/common";
import { User } from "../entities/user.entity";

@Injectable()
export class GetOneUserService{
    async getOne(id:string){
        try {
            const user = await User.findOne({
                where: {
                    id: +id
                },
                loadEagerRelations: true
            })
            return user
        } catch (error) {
            throw error
        }
    }
}
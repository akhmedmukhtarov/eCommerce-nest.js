import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../entities/user.entity';

@Injectable()
export class GetOneUserService {
    async getOne(id: string, req: any) {
        try {
            if (req.role === 'user') {
                const user = await User.findOne({
                    relations: ['delivery'],
                    where: {
                        id: req.id,
                    },
                    loadEagerRelations: true,
                });
                return user;
            }
            const user = await User.findOne({
                relations: ['delivery'],

                where: {
                    id: +id,
                },
                loadEagerRelations: true,
            });
            if(!user){
                throw new NotFoundException(`User with id: '${id}' not found`)
            }
            return user;
        } catch (error) {
            throw error;
        }
    }
}

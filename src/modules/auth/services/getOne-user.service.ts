import { Injectable } from '@nestjs/common';
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
            return user;
        } catch (error) {
            throw error;
        }
    }
}

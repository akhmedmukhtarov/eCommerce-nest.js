import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Delivery } from '../entities/delivery.entity';

@Injectable()
export class GetOneOrderService {
    async getOne(req: any, id: string) {
        try {
            if (req.role === 'user') {
                const delivery = await Delivery.find({
                    relations: ['orders'],
                    where: {
                        user: { id: +req.id },
                    },
                    loadEagerRelations: true,
                });
                return delivery;
            } else {
                const delivery = await Delivery.find({
                    where: {
                        id: +id,
                    },
                    relations: ['orders'],
                    loadEagerRelations: true,
                });
                if(!delivery){
                    throw new NotFoundException()
                }
                return delivery;
            }
        } catch (error) {
            throw error;
        }
    }
}

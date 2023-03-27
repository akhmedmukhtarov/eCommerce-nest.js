import { Injectable } from '@nestjs/common';
import { Event } from '../entities/event.entity';

@Injectable()
export class FindOneEventService {
    async finOne(id: string) {
        try {
            const event = await Event.findOneBy({ id: +id });
            return event;
        } catch (error) {
            throw error;
        }
    }
}

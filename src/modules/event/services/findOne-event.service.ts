import { Injectable } from '@nestjs/common';
import { Event } from '../entities/event.entity';

@Injectable()
export class FindOneEventService {
    async finOne(slug: string) {
        try {
            const event = await Event.findOneBy({ slug });
            return event;
        } catch (error) {
            throw error;
        }
    }
}

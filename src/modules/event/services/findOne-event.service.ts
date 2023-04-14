import { Injectable, NotFoundException } from '@nestjs/common';
import { Event } from '../entities/event.entity';

@Injectable()
export class FindOneEventService {
    async finOne(slug: string) {
        try {
            const event = await Event.findOneBy({ slug });
            if(!event){
                throw new NotFoundException(`Event with slug: '${slug}' not found`)
            }
            return event;
        } catch (error) {
            throw error;
        }
    }
}

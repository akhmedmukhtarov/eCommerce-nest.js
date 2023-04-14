import { UpdateEventDto } from '../dto/update-event.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Event } from '../entities/event.entity';

@Injectable()
export class UpdateEventService {
    async update(eventSlug: string, updateEventDto: UpdateEventDto) {
        try {
            const event = await Event.findOneBy({slug: eventSlug})
            if(!event){
                throw new NotFoundException(`Event with slug: '${eventSlug}' not found`)
            }
            await Event.update({slug: eventSlug}, updateEventDto)
        } catch (error) {
            throw error;
        }
    }
}

import { UpdateEventDto } from '../dto/update-event.dto';
import { Injectable } from '@nestjs/common';
import { Event } from '../entities/event.entity';

@Injectable()
export class UpdateEventService {
    async update(slug: string, updateEventDto: UpdateEventDto) {
        try {
            const result = await Event.update({slug}, updateEventDto);
            return result;
        } catch (error) {
            throw error;
        }
    }
}

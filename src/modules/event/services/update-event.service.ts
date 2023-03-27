import { UpdateEventDto } from '../dto/update-event.dto';
import { Injectable } from '@nestjs/common';
import { Event } from '../entities/event.entity';

@Injectable()
export class UpdateEventService {
    async update(id: string, updateEventDto: UpdateEventDto) {
        try {
            const result = await Event.update(+id, updateEventDto);
            return result;
        } catch (error) {
            throw error;
        }
    }
}

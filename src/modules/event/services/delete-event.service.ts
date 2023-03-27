import { Injectable } from '@nestjs/common';
import { Event } from '../entities/event.entity';

@Injectable()
export class DeleteEventService {
    async delete(id: string) {
        try {
            const result = await Event.delete({ id: +id });
            return result;
        } catch (error) {
            throw error;
        }
    }
}

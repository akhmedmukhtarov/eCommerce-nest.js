import { Injectable } from '@nestjs/common';
import { Event } from '../entities/event.entity';

@Injectable()
export class DeleteEventService {
    async delete(slug: string) {
        try {
            const result = await Event.delete({slug});
            return result;
        } catch (error) {
            throw error;
        }
    }
}

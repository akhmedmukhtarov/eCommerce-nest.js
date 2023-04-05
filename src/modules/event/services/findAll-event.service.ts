import { Injectable } from '@nestjs/common';
import { Event } from '../entities/event.entity';

@Injectable()
export class FindAllEventService {
    async findAll() {
        try {
            const events = await Event.find();
            return events;
        } catch (error) {
            throw error;
        }
    }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { Event } from '../entities/event.entity';

@Injectable()
export class DeleteEventService {
    async delete(slug: string) {
        try {
            const event = await Event.findOneBy({slug})
            if(!event){
                throw new NotFoundException(`Event with slug: '${slug}' not found`)
            }
            const result = await Event.delete({slug});
        } catch (error) {
            throw error;
        }
    }
}

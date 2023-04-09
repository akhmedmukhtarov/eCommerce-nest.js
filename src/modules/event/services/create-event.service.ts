import { CreateEventDto } from '../dto/create-event.dto';
import { Injectable } from '@nestjs/common';
import { Event } from '../entities/event.entity';
import { slugify } from 'src/common/helpers/slugify';

@Injectable()
export class CreateEventService {
    async create(createEventDto: CreateEventDto) {
        try {
            const { titleRu, titleUz, position, image, url, startsAt, endsAt } = createEventDto;

            const slug = slugify(titleUz)
            
            let event = Event.create({
                titleRu,
                titleUz,
                position,
                image,
                url,
                startsAt,
                endsAt,
                slug,
            });
            event = await event.save();

            const result = await Event.update({id: +event.id},{slug: slug + event.id})
        } catch (error) {
            throw error;
        }
    }
}

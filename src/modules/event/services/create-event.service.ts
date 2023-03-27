import { CreateEventDto } from '../dto/create-event.dto';
import { Injectable } from '@nestjs/common';
import { Event } from '../entities/event.entity';

@Injectable()
export class CreateEventService {
    create(createEventDto: CreateEventDto) {
        try {
            const { titleRu, titleUz, position, image, url, startsAt, endsAt } =
                createEventDto;
            const slug = titleUz
                .split(' ')
                .join('')
                .split("'")
                .join('')
                .split('/')
                .join('');
            const event = Event.create({
                titleRu,
                titleUz,
                position,
                image,
                url,
                startsAt,
                endsAt,
                slug,
            });
            event.save();
        } catch (error) {
            throw error;
        }
    }
}

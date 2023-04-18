import { UpdateEventDto } from '../dto/update-event.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Event } from '../entities/event.entity';
import { slugify } from 'src/common/helpers/slugify';

@Injectable()
export class UpdateEventService {
    async update(eventSlug: string, updateEventDto: UpdateEventDto) {
        try {
            const {titleRu,titleUz,url,position,startsAt,endsAt} = updateEventDto
            const image = updateEventDto.image.join('')
            const event = await Event.findOneBy({slug: eventSlug})
            if(!event){
                throw new NotFoundException(`Event with slug: '${eventSlug}' not found`)
            }
            let slug: string
            if(titleUz){
                slug = slugify(slug)
            }

            event.titleRu = titleRu ? titleRu : event.titleRu
            event.titleUz = titleUz ? titleUz : event.titleUz
            event.image = image ? image : event.image
            event.url = url ? url : event.url
            event.position = position ? position : event.position
            event.startsAt = startsAt ? startsAt : event.startsAt
            event.endsAt = endsAt ? endsAt : event.endsAt
            event.slug = slug ? slug+event.id : event.slug
            
            return await event.save()
        } catch (error) {
            throw error;
        }
    }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { Event } from '../entities/event.entity';
import { FindAllEventDto } from '../dto/findAll-event.dto';
import { Pagination } from 'src/common/pagination/pagination';
require('dotenv').config()
@Injectable()
export class FindAllEventService {
    async findAll(findAllEventDto:FindAllEventDto) {
        try {
            const {page,limit} = findAllEventDto
            const maxPaginationLimit = process.env.MAX_EVENT_PAGINATION_LIMIT
            const pagination = new Pagination(page,limit,maxPaginationLimit)
            const events = await Event.find({
                take: pagination.limit,
                skip: pagination.skippedItems
            });
            if(!events){
                throw new NotFoundException(`Any event not found`)
            }
            return events;
        } catch (error) {
            throw error;
        }
    }
}

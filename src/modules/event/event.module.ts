import { Module } from '@nestjs/common';
import { EventController } from './event.controller';
import { CreateEventService } from './services/create-event.service';
import { DeleteEventService } from './services/delete-event.service';
import { FindAllEventService } from './services/findAll-event.service';
import { FindOneEventService } from './services/findOne-event.service';
import { UpdateEventService } from './services/update-event.service';

@Module({
    controllers: [EventController],
    providers: [
        CreateEventService,
        FindAllEventService,
        FindOneEventService,
        UpdateEventService,
        DeleteEventService
    ],
})
export class EventModule {}

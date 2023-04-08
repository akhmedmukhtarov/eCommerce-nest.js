import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { CreateEventService } from './services/create-event.service';
import { DeleteEventService } from './services/delete-event.service';
import { FindAllEventService } from './services/findAll-event.service';
import { FindOneEventService } from './services/findOne-event.service';
import { UpdateEventService } from './services/update-event.service';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';

@ApiTags('events')
@Controller('event')
export class EventController {
    constructor(
        private readonly createEventService: CreateEventService,
        private readonly findAllEventService: FindAllEventService,
        private readonly findOneEventService: FindOneEventService,
        private readonly updateEventService: UpdateEventService,
        private readonly deleteEventService: DeleteEventService,
    ) {}

    @ApiBearerAuth()
    @ApiHeader({name: 'authorization', required:true, description: 'admin or moderators bearer token'})
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    create(@Body() createEventDto: CreateEventDto) {
        return this.createEventService.create(createEventDto);
    }

    @Get()
    findAll() {
        return this.findAllEventService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.findOneEventService.finOne(id);
    }

    @ApiBearerAuth()
    @ApiHeader({name: 'authorization', required:true, description: 'admin or moderators bearer token'})
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
        return this.updateEventService.update(id, updateEventDto);
    }

    @ApiBearerAuth()
    @ApiHeader({name: 'authorization', required:true, description: 'admin or moderators bearer token'})
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.deleteEventService.delete(id);
    }
}

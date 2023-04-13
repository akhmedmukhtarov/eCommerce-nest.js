import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { CreateEventService } from './services/create-event.service';
import { DeleteEventService } from './services/delete-event.service';
import { FindAllEventService } from './services/findAll-event.service';
import { FindOneEventService } from './services/findOne-event.service';
import { UpdateEventService } from './services/update-event.service';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { ApiBearerAuth, ApiHeader, ApiQuery, ApiTags } from '@nestjs/swagger';
import { FindAllEventDto } from './dto/findAll-event.dto';

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
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    create(@Body() createEventDto: CreateEventDto) {
        return this.createEventService.create(createEventDto);
    }

    @ApiQuery({name: 'limit', required: false, description: 'pagination limit'})
    @ApiQuery({name: 'page', required: false, description: 'pagination page'})
    @Get()
    findAll(@Query() findAllEventDto:FindAllEventDto) {
        return this.findAllEventService.findAll(findAllEventDto);
    }

    @Get(':slug')
    findOne(@Param('slug') slug: string) {
        return this.findOneEventService.finOne(slug);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Patch(':slug')
    update(@Param('slug') slug: string, @Body() updateEventDto: UpdateEventDto) {
        return this.updateEventService.update(slug, updateEventDto);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':slug')
    remove(@Param('slug') slug: string) {
        return this.deleteEventService.delete(slug);
    }
}

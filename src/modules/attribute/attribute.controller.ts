import { CreateAttributeService } from './services/create-attribute.service';
import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { CreateAttributeDto } from './dto/create-attribute.dto';
import { UpdateAttributeDto } from './dto/update-attribute.dto';
import { GetAllAttributeService } from './services/getAll-attribute.service';
import { FindOneAttributeService } from './services/findOne-attribute.service';
import { UpdateAttributeService } from './services/update-attribute.service';
import { DeleteAttributeService } from './services/delete-attribute.service';

@Controller('attribute')
export class AttributeController {
    constructor(
        private readonly createAttributeService: CreateAttributeService,
        private readonly getAllAttributeService: GetAllAttributeService,
        private readonly findOneAttributeService: FindOneAttributeService,
        private readonly updateAttributeService: UpdateAttributeService,
        private readonly deleteAttributeService: DeleteAttributeService,
    ) {}

    @Post()
    create(@Body() createAttributeDto: CreateAttributeDto) {
        return this.createAttributeService.create(createAttributeDto);
    }

    @Get()
    findAll() {
        return this.getAllAttributeService.getAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.findOneAttributeService.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateAttributeDto: UpdateAttributeDto,
    ) {
        return this.updateAttributeService.update(id, updateAttributeDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.deleteAttributeService.delete(id);
    }
}

import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { CreateAttributeValueDto } from './dto/create-attribute-value.dto';
import { UpdateAttributeValueDto } from './dto/update-attribute-value.dto';
import { CreateAttributeValueService } from './services/create-attribute-value.service';
import { FindAllAttributeValueService } from './services/findAll-attribute-valuve.service';
import { GetOneAttributeValueService } from './services/getOne-attribute-value.service';
import { UpdateAttributeValueService } from './services/update-attribute-value.service';
import { DeleteAttributeVAlueService } from './services/delete-attribute-value.service';

@Controller('attribute-value')
export class AttributeValueController {
    constructor(
        private readonly createAttributeValueService: CreateAttributeValueService,
        private readonly findAllAttributeValueService: FindAllAttributeValueService,
        private readonly getOneAttributeValueService: GetOneAttributeValueService,
        private readonly updateAttributeValueService: UpdateAttributeValueService,
        private readonly deleteAttributeVAlueService: DeleteAttributeVAlueService,
    ) {}

    @Post()
    create(@Body() createAttributeValueDto: CreateAttributeValueDto) {
        return this.createAttributeValueService.create(createAttributeValueDto);
    }

    @Get()
    findAll() {
        return this.findAllAttributeValueService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.getOneAttributeValueService.getOne(id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateAttributeValueDto: UpdateAttributeValueDto,
    ) {
        return this.updateAttributeValueService.update(
            id,
            updateAttributeValueDto,
        );
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.deleteAttributeVAlueService.delete(id);
    }
}

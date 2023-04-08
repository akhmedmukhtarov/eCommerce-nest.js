import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CreateAttributeValueDto } from './dto/create-attribute-value.dto';
import { UpdateAttributeValueDto } from './dto/update-attribute-value.dto';
import { CreateAttributeValueService } from './services/create-attribute-value.service';
import { FindAllAttributeValueService } from './services/findAll-attribute-valuve.service';
import { GetOneAttributeValueService } from './services/getOne-attribute-value.service';
import { UpdateAttributeValueService } from './services/update-attribute-value.service';
import { DeleteAttributeVAlueService } from './services/delete-attribute-value.service';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';

@ApiTags('attribute-value')
@Controller('attribute-value')
export class AttributeValueController {
    constructor(
        private readonly createAttributeValueService: CreateAttributeValueService,
        private readonly findAllAttributeValueService: FindAllAttributeValueService,
        private readonly getOneAttributeValueService: GetOneAttributeValueService,
        private readonly updateAttributeValueService: UpdateAttributeValueService,
        private readonly deleteAttributeVAlueService: DeleteAttributeVAlueService,
    ) {}

    @ApiBearerAuth()
    @ApiHeader({name: 'authorization', required: true, description: 'admin or moderators bearer token'})
    @UseGuards(JwtAuthGuard, RolesGuard)
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

    @ApiBearerAuth()
    @ApiHeader({name: 'authorization', required: true, description: 'admin or moderators bearer token'})
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateAttributeValueDto: UpdateAttributeValueDto) {
        return this.updateAttributeValueService.update(id, updateAttributeValueDto);
    }

    @ApiBearerAuth()
    @ApiHeader({name: 'authorization', required: true, description: 'admin or moderators bearer token'})
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.deleteAttributeVAlueService.delete(id);
    }
}

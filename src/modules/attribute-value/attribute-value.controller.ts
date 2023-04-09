import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { CreateAttributeValueDto } from './dto/create-attribute-value.dto';
import { UpdateAttributeValueDto } from './dto/update-attribute-value.dto';
import { CreateAttributeValueService } from './services/create-attribute-value.service';
import { FindAllAttributeValueService } from './services/findAll-attribute-value.service';
import { GetOneAttributeValueService } from './services/getOne-attribute-value.service';
import { UpdateAttributeValueService } from './services/update-attribute-value.service';
import { DeleteAttributeVAlueService } from './services/delete-attribute-value.service';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiHeader, ApiQuery, ApiTags } from '@nestjs/swagger';
import { FindAllAttributeValuesDto } from './dto/findAll-attributeValues.dto';

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
    
    @ApiQuery({name: 'page', required:false,schema:{type: 'integer'}, description: 'pagination page'})
    @ApiQuery({name: 'limit', required:false, schema: {type: 'integer'},description: 'pagination limit'})
    @ApiQuery({name: 'attr', required:false, schema: {type: 'attribute slug'},description: 'find all values of attribute by attribute slug'})
    @Get()
    findAll(@Query() findAllAttributeValuesDto:FindAllAttributeValuesDto) {
        return this.findAllAttributeValueService.findAll(findAllAttributeValuesDto);
    }

    @Get(':slug')
    findOne(@Param('slug') slug: string) {
        return this.getOneAttributeValueService.getOne(slug);
    }

    @ApiBearerAuth()
    @ApiHeader({name: 'authorization', required: true, description: 'admin or moderators bearer token'})
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Patch(':slug')
    update(@Param('slug') slug: string, @Body() updateAttributeValueDto: UpdateAttributeValueDto) {
        return this.updateAttributeValueService.update(slug, updateAttributeValueDto);
    }

    @ApiBearerAuth()
    @ApiHeader({name: 'authorization', required: true, description: 'admin or moderators bearer token'})
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':slug')
    remove(@Param('slug') slug: string) {
        return this.deleteAttributeVAlueService.delete(slug);
    }
}

import { FindAllAttirbuteDto } from './dto/findAll-attribute.dto';
import { CreateAttributeService } from './services/create-attribute.service';
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { CreateAttributeDto } from './dto/create-attribute.dto';
import { UpdateAttributeDto } from './dto/update-attribute.dto';
import { GetAllAttributeService } from './services/findAll-attribute.service';
import { FindOneAttributeService } from './services/findOne-attribute.service';
import { UpdateAttributeService } from './services/update-attribute.service';
import { DeleteAttributeService } from './services/delete-attribute.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { ApiBearerAuth, ApiHeader, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Attribute } from './entities/attribute.entity';

@ApiTags('attribute')
@Controller('attribute')
export class AttributeController {
    constructor(
        private readonly createAttributeService: CreateAttributeService,
        private readonly getAllAttributeService: GetAllAttributeService,
        private readonly findOneAttributeService: FindOneAttributeService,
        private readonly updateAttributeService: UpdateAttributeService,
        private readonly deleteAttributeService: DeleteAttributeService,
    ) {}

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    create(@Body() createAttributeDto: CreateAttributeDto) {
        return this.createAttributeService.create(createAttributeDto);
    }

    @ApiQuery({name: 'categ', required:false, schema: {type: 'category slug'},description: 'find all attributes of category by category slug'})
    @ApiQuery({name: 'page', required:false,schema:{type: 'integer'}, description: 'pagination page'})
    @ApiQuery({name: 'limit', required:false, schema: {type: 'integer'},description: 'pagination limit'})
    @Get()
    findAll(@Query() findAllAttirbuteDto: FindAllAttirbuteDto): Promise<Attribute[]> {
        return this.getAllAttributeService.findAll(findAllAttirbuteDto);
    }

    @Get(':slug')
    findOne(@Param('slug') slug: string) {
        return this.findOneAttributeService.findOne(slug);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Patch(':slug')
    update(@Param('slug') slug: string, @Body() updateAttributeDto: UpdateAttributeDto) {
        return this.updateAttributeService.update(slug, updateAttributeDto);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':slug')
    remove(@Param('slug') slug: string) {
        return this.deleteAttributeService.delete(slug);
    }
}

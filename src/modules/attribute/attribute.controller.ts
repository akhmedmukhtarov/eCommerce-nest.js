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
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';

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
    @ApiHeader({name: 'authorization', required: true, description: 'admin or moderators bearer token'})
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    create(@Body() createAttributeDto: CreateAttributeDto) {
        return this.createAttributeService.create(createAttributeDto);
    }

    @Get()
    findAll(@Body() findAllAttirbuteDto: FindAllAttirbuteDto) {
        return this.getAllAttributeService.findAll(findAllAttirbuteDto);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.findOneAttributeService.findOne(id);
    }

    @ApiBearerAuth()
    @ApiHeader({name: 'authorization', required: true, description: 'admin or moderators bearer token'})
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateAttributeDto: UpdateAttributeDto) {
        return this.updateAttributeService.update(id, updateAttributeDto);
    }

    @ApiBearerAuth()
    @ApiHeader({name: 'authorization', required: true, description: 'admin or moderators bearer token'})
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.deleteAttributeService.delete(id);
    }
}

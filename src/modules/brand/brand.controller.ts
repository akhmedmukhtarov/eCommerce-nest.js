import { DeleteCategoryService } from './../category/services/delete-category.service';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { CreateBrandService } from './services/create-brand.service';
import { DeleteBrandService } from './services/delete-brand.service';
import { FindAllBrandService } from './services/findAll-brand.service';
import { GetOneBrandService } from './services/getOne-brand.service';
import { UpdateBrandService } from './services/update-brand.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';

@ApiTags('brand')
@Controller('brand')
export class BrandController {
    constructor(
        private readonly createBrandService: CreateBrandService,
        private readonly findAllBrandService: FindAllBrandService,
        private readonly getOneBrandService: GetOneBrandService,
        private readonly updateBrandService: UpdateBrandService,
        private readonly deleteBrandService: DeleteBrandService,
    ) {}

    @ApiBearerAuth()
    @ApiHeader({name: 'authorization', required:true, description: 'admin or moderators bearer token'})
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    create(@Body() createBrandDto: CreateBrandDto) {
        return this.createBrandService.create(createBrandDto);
    }

    @Get()
    findAll() {
        return this.findAllBrandService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.getOneBrandService.getOne(id);
    }

    @ApiBearerAuth()
    @ApiHeader({name: 'authorization', required:true, description: 'admin or moderators bearer token'})
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateBrandDto: UpdateBrandDto) {
        return this.updateBrandService.update(id, updateBrandDto);
    }

    @ApiBearerAuth()
    @ApiHeader({name: 'authorization', required:true, description: 'admin or moderators bearer token'})
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.deleteBrandService.delete(id);
    }
}

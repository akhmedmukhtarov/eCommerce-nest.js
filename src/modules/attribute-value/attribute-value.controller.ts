import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AttributeValueService } from './attribute-value.service';
import { CreateAttributeValueDto } from './dto/create-attribute-value.dto';
import { UpdateAttributeValueDto } from './dto/update-attribute-value.dto';

@Controller('attribute-value')
export class AttributeValueController {
  constructor(private readonly attributeValueService: AttributeValueService) {}

  @Post()
  create(@Body() createAttributeValueDto: CreateAttributeValueDto) {
  }

  @Get()
  findAll() {
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAttributeValueDto: UpdateAttributeValueDto) {
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
  }
}

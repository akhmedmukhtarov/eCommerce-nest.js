import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { typeOrmConfig } from './common/configs/typeorm.config';
import { AuthModule } from './modules/auth/auth.module';
import { AdminModule } from './modules/admin/admin.module';
import { CategoryModule } from './modules/category/category.module';
import { ProductModule } from './modules/product/product.module';
import { MediaModule } from './modules/media/media.module';
import { AttributeModule } from './modules/attribute/attribute.module';
import { AttributeValueModule } from './modules/attribute-value/attribute-value.module';
import { BrandModule } from './modules/brand/brand.module';



@Module({
    imports: [
        TypeOrmModule.forRoot(typeOrmConfig),
        AuthModule,
        AdminModule,
        CategoryModule,
        ProductModule,
        MediaModule,
        AttributeModule,
        AttributeValueModule,
        BrandModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
  constructor(private dataSource: DataSource){}
}
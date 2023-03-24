import { User } from '../../modules/auth/entities/user.entity';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Admin } from 'src/modules/admin/entities/admin.entity';
import { Category } from 'src/modules/category/entities/category.entity';
import { Product } from 'src/modules/product/entities/product.entity';
import { Attribute } from 'src/modules/attribute/entities/attribute.entity';
import { AttributeValue } from 'src/modules/attribute-value/entities/attribute-value.entity';

require('dotenv').config()

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 8889,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: 'sdb-nest',
    entities: [User, Admin, Category, Product, Attribute, AttributeValue],
    synchronize: true,
};

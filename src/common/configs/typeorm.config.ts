import { User } from '../../modules/auth/entities/user.entity';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Admin } from 'src/modules/admin/entities/admin.entity';
import { Category } from 'src/modules/category/entities/category.entity';
import { Product } from 'src/modules/product/entities/product.entity';
import { Attribute } from 'src/modules/attribute/entities/attribute.entity';
import { AttributeValue } from 'src/modules/attribute-value/entities/attribute-value.entity';
import { Brand } from 'src/modules/brand/entities/brand.entity';
import { Event } from 'src/modules/event/entities/event.entity';
import { Order } from 'src/modules/order/entities/order.entity';
import { Delivery } from 'src/modules/order/entities/delivery.entity';

require('dotenv').config();

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 8889,
    username: 'root',
    password: 'root',
    database: 'sdb-nest',
    entities: [
        User,
        Admin,
        Category,
        Product,
        Attribute,
        AttributeValue,
        Brand,
        Event,
        Order,
        Delivery
    ],
    synchronize: true,
};

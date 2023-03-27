import { Injectable } from '@nestjs/common';
import { Like } from 'typeorm';
import { FindAllProductDto } from '../dto/findAll-product.dto';
import { Product } from '../entities/product.entity';

@Injectable()
export class FindAllProductService {
    async findAll(findAllProductDto: FindAllProductDto) {
        try {
            let { page, limit, attr, search }: any = findAllProductDto;
            page = +page;
            limit = +limit;
            limit = limit || 15;
            limit = limit > 15 ? 15 : limit;
            const skippedItems = (page || 1 - 1) * +limit;

            if (attr && search) {
                const attributeValues = [];
                attr = attr.split(',').map((el) => +el);
                for (const attrValueId of attr) {
                    attributeValues.push({ id: attrValueId });
                }

                const products = await Product.find({
                    where: {
                        attributeValues,
                        nameUz: Like(`%${search}%`)
                    },
                    take: limit,
                    skip: skippedItems,
                });
                return products

            } else if (attr) {
                const attributeValues = [];
                attr = attr.split(',').map((el) => +el);
                for (const attrValueId of attr) {
                    attributeValues.push({ id: attrValueId });
                }

                const products = await Product.find({
                    where: {
                        attributeValues,
                    },
                    take: limit,
                    skip: skippedItems,
                });

                return products;
            } else if (search) {
                const products = await Product.find({
                    take: limit,
                    skip: skippedItems,
                    where: {
                        nameUz: Like(`%${search}%`)
                    }
                })
                return products
            } else {
                const products = await Product.find({
                    take: limit,
                    skip: skippedItems,
                });
                return products
            }
        } catch (err) {
            throw err;
        }
    }
}

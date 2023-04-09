import { SearchProductDto } from './../dto/search-product.dto';
import { Injectable } from "@nestjs/common";
import { Product } from "../entities/product.entity";
import { Like } from "typeorm";
import { Pagination } from "src/common/pagination/pagination";
require('dotenv').config()

@Injectable()
export class SearchProductService{
    async search(searchProductDto:SearchProductDto){
        const {page,limit,keyword} = searchProductDto
        const russian = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдеёжзийклмнопрстуфхцчшщъыьэюя'
        const english = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
        const maxPagination = process.env.MAX_PRODUCT_PAGINATION_LIMIT
        const pagination = new Pagination(page,limit,maxPagination)
        const query = keyword.split('')
        for(const letter of query){
            if(russian.includes(letter)){
                const products = Product.find({
                    where:{
                        nameRu: Like(`%${keyword}%`)
                    },
                    take: pagination.limit,
                    skip: pagination.skippedItems
                })
                return products
            }else if(english.includes(letter)){
                const products = Product.find({
                    where:{
                        nameUz: Like(`%${keyword}%`)
                    },
                    take: pagination.limit,
                    skip: pagination.skippedItems
                })
                return products
            }
        }
    }
}
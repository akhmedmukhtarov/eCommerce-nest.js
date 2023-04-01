import { FindAllUserDto } from '../dto/findAll-user.dto';
import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { Pagination } from 'src/common/pagination/pagination';
import { Like } from 'typeorm';
require('dotenv').config()

@Injectable()
export class FindAllUserService {
    async findAllUser(findAllUserDto: FindAllUserDto) {
        let {page,limit,search}: any = findAllUserDto
        const maxUserPaginationLimit = process.env.MAX_USER_PAGINATION_LIMIT
        const pagination = new Pagination(page, limit, maxUserPaginationLimit)
        const users = User.find({
            where: {
                phone: Like(`%${search}%`)
            },
            // loadRelationIds: true,
            take: pagination.limit,
            skip: pagination.skippedItems
        });
        return users
    }
}

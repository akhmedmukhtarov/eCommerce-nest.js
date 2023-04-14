import { Injectable, NotAcceptableException } from '@nestjs/common';
import { SetModeratorDto } from '../dto/adminSetModerator.dto';
import { Admin } from '../entities/admin.entity';
const bcrypt = require('bcrypt');

@Injectable()
export class SetModeratorService {
    async setModerator(setModeratorDto: SetModeratorDto) {
        try {
            const { username, password, name, phone } = setModeratorDto;
            const checkModerator = await Admin.findOneBy({username})
            if(checkModerator){
                throw new NotAcceptableException(`Moderator or Admin with usernaem: '${username}' already exists`)
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const moderator = Admin.create({
                username,
                hashedPassword,
                name,
                phone,
            });
            return await moderator.save();
        } catch (err) {
            throw err;
        }
    }
}

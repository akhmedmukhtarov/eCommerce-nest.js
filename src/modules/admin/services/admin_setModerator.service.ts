import { Injectable } from '@nestjs/common';
import { SetModeratorDto } from '../dto/adminSetModerator.dto';
import { Admin } from '../entities/admin.entity';
const bcrypt = require('bcrypt');

@Injectable()
export class SetModeratorService {
    async setModerator(setModeratorDto: SetModeratorDto) {
        try {
            const { username, password, name, phone } = setModeratorDto;
            const hashedPassword = await bcrypt.hash(password, 10);
            const moderator = Admin.create({
                username,
                hashedPassword,
                name,
                phone,
            });
            moderator.save();
        } catch (err) {
            console.log(err);
        }
    }
}

import { Injectable } from '@nestjs/common';
import { Admin } from '../entities/admin.entity';

@Injectable()
export class AdminDeleteModeratorService {
    async deleteModerator(username: string) {
        try {
            Admin.delete({ username });
        } catch (err) {
            console.log(err);
        }
    }
}

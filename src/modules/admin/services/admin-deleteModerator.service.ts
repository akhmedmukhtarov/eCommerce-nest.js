import { DeleteModeratorDto } from './../dto/delete-moderator.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Admin } from '../entities/admin.entity';

@Injectable()
export class AdminDeleteModeratorService {
    async deleteModerator(deleteModeratorDto: DeleteModeratorDto) {
        try {
            const checkModerator = await Admin.findOneBy({username: deleteModeratorDto.username})
            
            if(!checkModerator){
                throw new NotFoundException(`Moderator or admin with username '${deleteModeratorDto.username}' not found`)
            }
            await Admin.delete({username: deleteModeratorDto.username });
        } catch (err) {
            throw err
        }
    }
}

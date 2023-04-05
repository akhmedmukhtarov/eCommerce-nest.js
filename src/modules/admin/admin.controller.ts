import { AdminDeleteModeratorService } from './services/admin-deleteModerator.service';
import { AdminLoginService } from './services/admin-login.service';

import { Body, Controller, Delete, Post, Put, UseGuards } from '@nestjs/common';
import { AdminLoginDto } from './dto/adminLogin.dto';
import { SetModeratorDto } from './dto/adminSetModerator.dto';
import { SetModeratorService } from './services/admin_setModerator.service';
import { AdminRefreshTokenDto } from './dto/adminRefreshToken.dto';
import { AdminRefreshTokenService } from './services/admin-refreshToken.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
require('dotenv').config();

@Controller('admin')
export class AdminCategories {
    constructor(
        private adminLoginService: AdminLoginService,
        private setModeratorService: SetModeratorService,
        private adminRefreshTokenService: AdminRefreshTokenService,
        private adminDeleteModeratorService: AdminDeleteModeratorService,
    ) {}

    @Post('login')
    adminLogin(@Body() adminLoginDto: AdminLoginDto) {
        return this.adminLoginService.adminLogin(adminLoginDto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Put('setmoderator')
    setModerator(setModeratorDto: SetModeratorDto) {
        return this.setModeratorService.setModerator(setModeratorDto);
    }

    @Post('refresh')
    refresh(@Body() adminRefreshTokenDto: AdminRefreshTokenDto) {
        return this.adminRefreshTokenService.refresh(adminRefreshTokenDto);
    }

    @Delete('delete')
    deleteModerator(@Body() username: string) {
        return this.adminDeleteModeratorService.deleteModerator(username);
    }
}

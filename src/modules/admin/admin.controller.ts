import { AdminDeleteModeratorService } from './services/admin-deleteModerator.service';
import { AdminLoginService } from './services/admin-login.service';

import { Body, Controller, Delete, Patch, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AdminLoginDto } from './dto/adminLogin.dto';
import { SetModeratorDto } from './dto/adminSetModerator.dto';
import { SetModeratorService } from './services/admin_setModerator.service';
import { AdminRefreshTokenDto } from './dto/adminRefreshToken.dto';
import { AdminRefreshTokenService } from './services/admin-refreshToken.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { ApiBearerAuth, ApiBody, ApiHeader, ApiTags } from '@nestjs/swagger';
import { AdminLogoutService } from './services/admin-logout.service';
require('dotenv').config();

@ApiTags('admin registration and setting and/or deleting moderators')
@Controller('admin')
export class AdminCategories {
    constructor(
        private adminLoginService: AdminLoginService,
        private setModeratorService: SetModeratorService,
        private adminRefreshTokenService: AdminRefreshTokenService,
        private adminDeleteModeratorService: AdminDeleteModeratorService,
        private adminLogoutService:AdminLogoutService,
    ) {}

    @Post('login')
    adminLogin(@Body() adminLoginDto: AdminLoginDto) {
        return this.adminLoginService.adminLogin(adminLoginDto);
    }


    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Post('setmoderator')
    setModerator(@Body() setModeratorDto: SetModeratorDto) {
        return this.setModeratorService.setModerator(setModeratorDto);
    }

    @Post('refresh')
    refresh(@Body() adminRefreshTokenDto: AdminRefreshTokenDto) {
        return this.adminRefreshTokenService.refresh(adminRefreshTokenDto);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Delete('delete')
    deleteModerator(@Body() username: string) {
        return this.adminDeleteModeratorService.deleteModerator(username);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Patch('logout')
    logout(@Req() req:any){
        return this.adminLogoutService.logout(req)
    }
}

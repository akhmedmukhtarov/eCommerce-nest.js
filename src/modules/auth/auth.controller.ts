import { GetOneUserService } from './services/getOne-user.service';

import { RefreshTokenService } from './services/auth-refreshToken.service';
import { RefreshTokenDto } from './dto/refreshToken.dto';
import { VerifyOtpService } from './services/auth-verifyOtp.service';
import { VerifyOtpDto } from './dto/verifyOtp.dto';
import { RegisterDto } from './dto/register.dto';
import { LoginService } from './services/auth-login.service';
import { Controller, Get, Post, Body, Param, Delete, UseGuards, Query, Req, Patch } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { FindAllUserDto } from './dto/findAll-user.dto';
import { FindAllUserService } from './services/findAll-users.service';
import { DeleteUserservice } from './services/delete-user.service';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { LogoutUserService } from './services/logout-user.service';
import { ApiBearerAuth, ApiHeader, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('user auth')
@Controller('user')
export class AuthController {
    constructor(
        private loginService: LoginService,
        private verifyOtpService: VerifyOtpService,
        private refreshTokenService: RefreshTokenService,
        private findAllUserService: FindAllUserService,
        private deleteUserservice: DeleteUserservice,
        private getOneUserService: GetOneUserService,
        private logoutUserService:LogoutUserService
    ) {}

    @Post('login')
    login(@Body() phoneNumber: RegisterDto) {
        return this.loginService.login(phoneNumber);
    }

    @Post('verify')
    verifyOtp(@Body() data: VerifyOtpDto) {
        return this.verifyOtpService.verifyOtp(data);
    }

    @Post('refresh')
    refresh(@Body() token: RefreshTokenDto) {
        return this.refreshTokenService.refresh(token);
    }

    @ApiQuery({name: 'page', required: false, schema: {type: 'integer'}})
    @ApiQuery({name: 'limit', required: false, schema: {type: 'integer'}})
    @ApiQuery({name: 'search', required: false, schema: {type: 'phone number of user'}})
    @ApiBearerAuth()
    @ApiHeader({name: 'authorization', required: true, description: 'admin or moderators bearer token'})
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get()
    findAllUsers(@Query() findAllUserDto: FindAllUserDto) {
        return this.findAllUserService.findAllUser(findAllUserDto);
    }

    @ApiBearerAuth()
    @ApiHeader({name: 'authorization', required: true, description: 'bearer token'})
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    getOne(@Param('id') id: string, @Req() req: any) {
        return this.getOneUserService.getOne(id,req);
    }

    @ApiBearerAuth()
    @ApiHeader({name: 'authorization', required: true, description: 'admin or moderators bearer token'})
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.deleteUserservice.delete(id);
    }

    @ApiBearerAuth()
    @ApiHeader({name: 'authorization', required: true, description: 'bearer token'})
    @UseGuards(JwtAuthGuard)
    @Patch('logout')
    logout(@Req() req:any){
        this.logoutUserService.logout(req)
    }
}

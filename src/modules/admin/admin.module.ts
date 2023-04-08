import { AdminDeleteModeratorService } from './services/admin-deleteModerator.service';
import { AdminRefreshTokenService } from './services/admin-refreshToken.service';
import { SetModeratorService } from './services/admin_setModerator.service';
import { AdminLoginService } from './services/admin-login.service';
import { AdminCategories } from './admin.controller';
import { Module } from '@nestjs/common';
import { AdminLogoutService } from './services/admin-logout.service';

@Module({
    controllers: [AdminCategories],
    providers: [AdminLoginService,SetModeratorService,AdminRefreshTokenService,AdminDeleteModeratorService, AdminLogoutService]
})
export class AdminModule {}

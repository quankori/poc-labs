import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './modules/core/core.module';
import { UserModule } from './modules/users/application/users.module';
import { UsersInfrastructureModule } from './modules/users/infrastructure/users-infrastructure.module';

@Module({
  imports: [
    CoreModule,
    UserModule.withInfrastructure(UsersInfrastructureModule),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static register() {
    return {
      module: AppModule,
      imports: [CoreModule.forRoot()],
    };
  }
}

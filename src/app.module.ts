import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/entities/user.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER_NAME,
      password: '',
      database: process.env.DB_DATABASE,
      entities: [UserEntity],
      synchronize: process.env.ENV === "development" ? true : false, //Essa linha deve ficar 'false' em produção
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

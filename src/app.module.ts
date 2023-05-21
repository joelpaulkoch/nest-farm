import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FarmersModule } from './farmers/farmers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'ep-delicate-lake-272707-pooler.eu-central-1.aws.neon.tech',
      port: 5432,
      username: 'joelpaulkoch',
      password: 'dmPTl1CZjU6w',
      database: 'test',
      entities: [],
      ssl: true,
    }),
    FarmersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

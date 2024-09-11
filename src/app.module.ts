import { Module } from '@nestjs/common';
import { JogadoresModule } from './jogadores/jogadores.module';
import {MongooseModule} from "@nestjs/mongoose";
import * as process from "process";
import {ConfigModule} from "@nestjs/config";


@Module({
  imports: [
    ConfigModule.forRoot(),
    JogadoresModule,
    MongooseModule.forRoot(process.env.MONGO_URL)

],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { JogadoresModule } from './jogadores/jogadores.module';
import {MongooseModule} from "@nestjs/mongoose";
import * as process from "process";


@Module({
  imports: [
    JogadoresModule,
    MongooseModule.forRoot(process.env.MONGO_URL)

],
  controllers: [],
  providers: [],
})
export class AppModule {}

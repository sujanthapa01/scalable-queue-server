import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BullModule } from "@nestjs/bullmq"
import { QueueWorker } from "./queue.worker"
import { EnvModule } from "./config/env/config.module"
import {PrismaModule} from "./prisma/prisma.module"
@Module({
  imports: [BullModule.forRoot({
    connection: {
      host: "localhost",
      port: 6379
    }
  }),
  BullModule.registerQueue({
    name: "queue-1"
  }), EnvModule,PrismaModule],
  controllers: [AppController],
  providers: [AppService, QueueWorker],
})
export class AppModule { }

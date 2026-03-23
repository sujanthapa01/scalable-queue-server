import { Processor, WorkerHost } from "@nestjs/bullmq"
import { Job, Worker } from "bullmq"

@Processor('queue-1')
export class QueueWorker extends WorkerHost {
    async process(job: Job, token?: string): Promise<any> {
       await this.processQueueData(job)
    }


    async processQueueData(job: Job) {

        console.log(job.data.name)

    }
}


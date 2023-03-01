import { Module } from '@nestjs/common'
import { TypegooseModule } from 'nestjs-typegoose'
import { TasksService } from './tasks.service'
import { TasksResolver } from './tasks.resolver'
import { Task } from './entities/task.entity'
import { TasksLoader } from './tasks.loader'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { DataLoaderInterceptor } from 'nestjs-dataloader'

@Module({
  imports: [TypegooseModule.forFeature([Task])],
  providers: [
    TasksResolver,
    TasksService,
    TasksLoader,
    {
      provide: APP_INTERCEPTOR,
      useClass: DataLoaderInterceptor
    }
  ]
})
export class TasksModule {}

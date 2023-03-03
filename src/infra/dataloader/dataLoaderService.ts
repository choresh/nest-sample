// import { Injectable } from '@nestjs/common'
// import * as DataLoader from 'nestjs-dataloader'
// import { type ReturnModelType } from '@typegoose/typegoose'
// import { type Model } from 'mongoose'

// @Injectable()
// export class DataLoaderService {
//   private readonly loaders = new Map<string, DataLoader<any, any>>()

//   getOrCreateLoader<T>(
//     model: ReturnModelType<any>,
//     property: string
//   ): DataLoader<string, T> {
//     const key = `${(model as Model<T>).modelName}.${property}`
//     if (!this.loaders.has(key)) {
//       this.loaders.set(
//         key,
//         new DataLoader<string, T>(async (keys: [string]): Promise<Array<T | undefined>> => {
//           const result = await model
//             .find({ [property]: { $in: keys } })
//             .exec()
//           const resultMap = new Map<string, T>()
//           result.forEach((r: any) => resultMap.set(r[property], r))
//           return keys.map((key: any) => resultMap.get(key))
//         })
//       )
//     }
//     return this.loaders.get(key)
//   }
// }

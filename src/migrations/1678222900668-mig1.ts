import { getModelForClass } from '@typegoose/typegoose'
import { User } from './../users/entities/user.entity'
const userModel = getModelForClass(User)

/**
 * Make any changes you need to make to the database here
 */
export async function up (): Promise<void> {
  await userModel.syncIndexes()
  await userModel.updateMany({}, {
    $rename: { name: 'employeId' }
  }, { multi: true })
}

/**
 * Make any changes that UNDO the up function side effects here (if possible)
 */
export async function down (): Promise<void> {
  await userModel.updateMany({}, {
    $rename: { employeId: 'name' }
  }, { multi: true })
}

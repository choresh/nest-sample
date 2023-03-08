const moongoose = require('@typegoose/typegoose')
const User = require('./users/entities/user.entity')
console.log(User)
const userModel = moongoose.getModelForClass(User)
console.log(userModel)

/**
 * Make any changes you need to make to the database here
 */
async function up () {
  await userModel.syncIndexes()
  await userModel.updateMany({}, {
    $rename: { name: 'employeId' }
  }, { multi: true })
}

/**
 * Make any changes that UNDO the up function side effects here (if possible)
 */
async function down () {
  await userModel.updateMany({}, {
    $rename: { employeId: 'name' }
  }, { multi: true })
}

module.exports = { up, down }

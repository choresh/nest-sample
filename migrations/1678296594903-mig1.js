const typegoose = require('@typegoose/typegoose')
const userEntity = require('./../dist/src/users/entities/user.entity')
const userModel = typegoose.getModelForClass(userEntity.User)

/**
 * Make any changes you need to make to the database here
 */
async function up () {
  // Write migration here
  await userModel.updateMany({}, {
    $rename: { name: 'employeId' }
  }, { multi: true })
}

/**
 * Make any changes that UNDO the up function side effects here (if possible)
 */
async function down () {
  // Write migration here
}

module.exports = { up, down }

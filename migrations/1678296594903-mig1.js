const typegoose = require('@typegoose/typegoose')
const userEntity = require('./../dist/users/entities/user.entity')
const userModel = typegoose.getModelForClass(userEntity.User)

async function up () {
  await userModel.updateMany({}, {
    $rename: { name: 'employeId' }
  }, { multi: true })
}

async function down () {
}

module.exports = { up, down }

const mongoose = require('mongoose')

const dbConnection = async() => {
  try {
    await mongoose.connect(process.env.mongoDB_ATLAS)
    console.log('Database online')
  } catch (error) {
    console.log(error)
    throw new Error('Error al inicializar database')
  }
}

module.exports = {
  dbConnection
}
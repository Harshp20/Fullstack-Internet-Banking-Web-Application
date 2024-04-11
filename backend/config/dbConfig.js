import mongoose from 'mongoose'

export const dbConnection = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_DB_URI)
    console.log(`MongoDB connnected: ${connection.connection.host}`.green.underline)
  } catch (err) {
    console.log(err)
  }
}
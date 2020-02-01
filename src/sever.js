import express from 'express'
import mongoose from 'mongoose'
import routes from './routes'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

const server = express()
server.use(cors())
server.use(express.json())
server.use(routes)
try {
  mongoose.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-gmth0.mongodb.net/youtube_course?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
} catch (error) {
  console.log('error to connect: ' + error)
}

server.listen(3333, () => {
  console.log('port 3333')
})

import express from 'express'
import router from './routers'
import morgan from 'morgan'
import cors from 'cors'
import { protect } from './modules/auth'

const app = express()

const customLogger = (message) => (req, res, next) => {
  console.log(`Hello from ${message}`)
  next()
}

app.use(cors())
app.use(morgan('dev')) // logs all request
app.use(express.json()) // allows a client to send us json
app.use(express.urlencoded({extended: true})) //allows a client to add query strings and decodes that
app.use(customLogger('custom Logger')) // middleware that takes in an argument

//custom middleware
// app.use((req, res, next) => {
//   req.shh_secret = 'dog'
//   next()
// })

app.get('/', (req, res) => {
  console.log('hello from express')
  res.status(200)
  res.json({message: 'hello'})
})

app.use('/api', protect, router)

export default app
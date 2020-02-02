import express from 'express'
import UserController from './controllers/UserController'
import CategoryController from './controllers/CategoryController'
import SessionController from './controllers/SessionController'
import authMiddleware from './middlewares/auth'

const routes = express.Router()

routes.get('/user', UserController.index)
routes.post('/user', UserController.store)
routes.post('/user/session', SessionController.store)

routes.get('/category', CategoryController.index)
routes.get('/category/:_id', CategoryController.show)

routes.use(authMiddleware)

routes.put('/user/:_id', UserController.update)

routes.post('/category', CategoryController.store)
routes.delete('/category/:_id', CategoryController.destroy)

export default routes

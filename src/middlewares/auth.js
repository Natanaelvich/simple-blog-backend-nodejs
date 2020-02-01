import jwt from 'jsonwebtoken'
import { promisify } from 'util'

export default async (req, res, next) => {
  const authheader = req.headers.authorization

  if (!authheader) {
    return res.status(401).json({ error: 'token not provider' })
  }
  const [, token] = authheader.split(' ')

  try {
    const decode = await promisify(jwt.verify)(token, 'hahahahnatanaelvich')

    req.userId = decode._id

    return next()
  } catch (error) {
    return res.status(401).json({ error: 'token invalid' })
  }
}

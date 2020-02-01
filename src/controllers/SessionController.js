import User from '../models/User'
import * as Yup from 'yup'
import Bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export default {
  // session user
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validation fails' })
    }

    let { email, password } = req.body

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(404).json({ error: 'user not found' })
    }
    // hash password bcrypt
    if (!Bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: 'password does not match' })
    }
    const { _id } = user
    res.json({
      user,
      token: jwt.sign({ _id }, 'hahahahnatanaelvich', {
        expiresIn: '7d',
      }),
    })
  },
}

import User from '../models/User'
import * as Yup from 'yup'
import Bcrypt from 'bcryptjs'

export default {
  async index(req, res) {
    const users = await User.find()

    res.json(users)
  },

  // register user
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
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

    let { name, email, password } = req.body

    // hash password bcrypt
    password = Bcrypt.hashSync(password, 10)

    const user = await User.create({
      name,
      email,
      password,
    })

    res.json(user)
  },

  // update user
  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, fields) =>
          oldPassword ? fields.required() : fields
        ),
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validation fails' })
    }

    const { _id } = req.params
    const { name, email, oldPassword, password } = req.body

    const user = await User.findById(_id)

    // verified if exists old password for validit password
    if (oldPassword) {
      if (oldPassword !== user.password) {
        return res.status(401).json({ error: 'oldpassword fails' })
      }
    }

    if (password) {
      if (!oldPassword) {
        return res
          .status(401)
          .json({ error: 'please enter your password previous password' })
      }
    }

    const userUpdate = await user.updateOne({
      name: name ? name : user.name,
      email: email ? email : user.email,
      password: password ? password : user.password,
    })

    res.json(userUpdate)
  },
}

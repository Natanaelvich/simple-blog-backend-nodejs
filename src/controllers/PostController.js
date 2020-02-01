import Post from '../models/Post'
import * as Yup from 'yup'

export default {
  async index(req, res) {
    const posts = await Post.find()

    res.json(posts)
  },

  // register user
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      slug: Yup.string().required(),
      description: Yup.string().required(),
      context: Yup.string().required(),
      category: Yup.number().required(),
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validation fails' })
    }

    let { title, slug, description, context, category } = req.body

    // hash password bcrypt

    const post = await Post.create({
      title,
      slug,
      description,
      context,
      category,
    })

    res.json(post)
  },
}

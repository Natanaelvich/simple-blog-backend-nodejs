import Category from '../models/Category'

export default {
  // return all results
  async index(req, res) {
    const categories = await Category.find()

    console.log(categories)

    res.json(categories)
  },

  // create category
  async store(req, res) {
    const { name, slug } = req.body

    const categoExists = await Category.findOne({ name })
    const slugExists = await Category.findOne({ slug })

    if (categoExists) {
      return res.status(401).json({ error: 'this user already exists' })
    }

    if (slugExists) {
      return res.json({ error: 'this slug already exists' })
    }
    const categories = await Category.create({
      name,
      slug,
    })
    console.log(categories)

    res.json(categories)
  },

  // delete category
  async destroy(req, res) {
    const { _id } = req.params

    const categoExists = await Category.findOne({ _id })

    if (!categoExists) {
      return res.status(404).json({ error: 'category not found' })
    }
    await Category.deleteOne({ _id })

    return res.json({})
  },
}

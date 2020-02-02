import Category from '../models/Category'

export default {
  // return all results
  async index(req, res) {
    const categories = await Category.find()

    res.json(categories)
  },

  async show(req, res) {
    const { _id } = req.params

    try {
      const category = await Category.findOne({ _id: _id })

      if (!category) {
        return res.status(404).json({ error: 'category not found' })
      }
      console.log(category)
      res.json(category)
    } catch (error) {
      console.log(error)
    }
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

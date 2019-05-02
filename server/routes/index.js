import express from 'express'

const router = express.Router()

// GET homepage
router.get('*', (req, res) => {
  // uncomment below to throw an intentional error
  // throw new Error('Oops')
  res.render('index')
})

export default router

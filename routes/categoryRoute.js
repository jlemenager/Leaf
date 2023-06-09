const express = require('express')
const router = express.Router()
const controller = require('../controllers/categoryController')

router.get('/', controller.getAllCategories)
router.get('/:id', controller.getCategory)

module.exports = router
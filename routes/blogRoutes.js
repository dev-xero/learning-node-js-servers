const express = require('express');
const blogController = require('../controllers/blogController');
const router = express.Router();

router.get('/', (req, res) => blogController.blog_index(req, res));
router.get('/create', (req, res) => blogController.blog_create_get(req, res));
router.get('/:id', (req, res) => blogController.blog_details(req, res));
router.post('/', (req, res) => blogController.blog_create_post(req, res));
router.delete('/:id', (req, res) => blogController.blog_create_get(req, res));

module.exports = router;

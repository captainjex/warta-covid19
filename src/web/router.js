import express from 'express';
import * as kemkes from '../lib/services/kemkes';

const handleRes = (promise) => (req, res) => {
  promise(req, res).catch((error) => {
    res.status(500).send(error.message);
  });
};

const router = express.Router();

router.get('/', handleRes(async (req, res) => {
  const posts = await kemkes.getCoronaPosts();
  res.render('posts/index', { posts });
}));

router.get('/posts/:id', handleRes(async (req, res) => {
  const post = await kemkes.getPost(req.params.id);
  res.render('posts/detail', { post });
}));

export default router;

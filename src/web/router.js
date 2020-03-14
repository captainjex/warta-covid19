import express from 'express';
import * as kemkes from '../lib/services/kemkes';

const router = express.Router();

router.get('/kemkes/posts', async (req, res) => {
  const posts = await kemkes.getCoronaPosts();
  res.send(posts);
});

router.get('/kemkes/posts/:id', async (req, res) => {
  const post = await kemkes.getPost(req.params.id);
  res.send(post);
});

export default router;

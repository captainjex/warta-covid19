import axios from 'axios';

const request = axios.create({
  baseURL: 'https://infeksiemerging.kemkes.go.id/wp-json/wp/v2',
});

const CATEGORY_CORONA_POST = 88;

const getMediaUrl = async (mediaId) => {
  const { data: media } = await request.get(`/media/${mediaId}`);
  return media.source_url;
};

const getFormattedPost = async (post) => {
  const featuredMediaUrl = await getMediaUrl(post.featured_media);

  return {
    id: post.id,
    date: post.date,
    sourceLink: post.link,
    title: post.title.rendered,
    content: post.content.rendered,
    featuredMediaUrl,
  };
};


export const getCoronaPosts = async () => {
  const { data } = await request.get('/posts', {
    params: {
      categories: CATEGORY_CORONA_POST,
    },
  });

  const posts = await Promise.all(data.map((d) => getFormattedPost(d)));
  return posts;
};


export const getPost = async (postId) => {
  const { data } = await request.get(`/posts/${postId}`);
  return getFormattedPost(data);
};

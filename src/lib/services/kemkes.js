import axios from 'axios';
import cheerio from 'cheerio';

const request = axios.create({
  baseURL: 'https://infeksiemerging.kemkes.go.id/wp-json/wp/v2',
});

const CATEGORY_CORONA_POST = 88;

const cleanContent = (content) => {
  const $ = cheerio.load(`
    <div id="root">
      ${content}
    </div>
  `);
  const cleanedContent = cheerio('<div></div>');

  $('#root > *').each(function (i, el) {
    const classes = $(this).attr('class');
    if (classes) {
      if (classes.includes('pvc')) { // remove el with class %pvc%
        return;
      }
    }
    cleanedContent.append(el);
  });

  return cleanedContent.html();
};

const getFormattedPost = async (post) => ({
  id: post.id,
  date: post.date,
  sourceLink: post.link,
  title: post.title.rendered,
  content: cleanContent(post.content.rendered),
});


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

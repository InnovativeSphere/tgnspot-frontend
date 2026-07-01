import { getLatestPosts } from '../lib/posts';

async function test() {
  try {
    const posts = await getLatestPosts(5);
    console.log('? Success! Here are the latest posts:');
    console.log(JSON.stringify(posts, null, 2));
  } catch (error) {
    console.error('? Error fetching posts:', error);
  }
}
test();

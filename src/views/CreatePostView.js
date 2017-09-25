import ItemList from '@/components/List/PostList.vue';
import { capitalize } from '@/utils/filters';

export default function createPostView(type) {
  return {
    name: `${type}-posts-view`,
    title: capitalize(type),
    asyncData({ store }) {
      return store.dispatch('post/getPosts', { type });
    },
    render(h) {
      return h(ItemList, { props: { type } });
    }
  };
}

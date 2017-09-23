import ItemList from '@/components/PostList.vue';

const camelize = str => str.charAt(0).toUpperCase() + str.slice(1);

export default function createPostView(type) {
  return {
    name: `${type}-posts-view`,
    title: camelize(type),
    asyncData({ store }) {
      return store.dispatch('post/getPosts', { type });
    },
    render(h) {
      return h(ItemList, { props: { type } });
    }
  };
}

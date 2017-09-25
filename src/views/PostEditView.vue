<template>
  <div class="post-edit-view">
    <template v-if="selectedPost">
      <h1>Post: #{{ selectedPost.id }}</h1>
      <post-edit-form :data="selectedPost" />
    </template>
    <template v-else>
      <h1>User not found.</h1>
    </template>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import PostEditForm from '@/components/Form/PostEditForm.vue';

  export default {
    title() {
      return this.selectedPost
        ? `Edit post ${this.selectedPost.id}`
        : 'Post not found';
    },
    components: { PostEditForm },
    computed: {
      ...mapGetters('post', ['selectedPost']),
    },
    methods: {
      ...mapActions('post', ['getPost']),
    },
    asyncData({ store, route: { params: { id } } }) {
      store.dispatch('post/getPost', id);
    },
  };
</script>

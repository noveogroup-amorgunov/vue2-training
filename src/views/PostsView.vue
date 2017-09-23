<template>
  <div>
    <h1>Post</h1>
    <template v-if="isAdmin">
      <h2>Add new post</h2>
      <!--PostCreateForm @create-post="updateData = !updateData"/-->
    </template>
    <h2>Posts list</h2>
    <Grid
      entity-name="Post"
      :meta="meta"
      :data="posts"
      :update-data="updateData"
      :apiGetEntitiesMethod="loadPosts"
      :apiDeleteEntityMethod="deletePost"
      :columns="columns" />
  </div>
</template>

<!-- :edit-view="PostEditForm"
      :on-edit-view="updateData = !updateData" -->

<script>
  import { mapGetters } from 'vuex';
  import Grid from '@/components/Grid/Grid.vue';
  // import PostCreateForm from '@/components/Form/PostCreateForm.vue';
  // import PostEditForm from '@/components/Form/PostEditForm.vue';

  export default {
    name: 'posts-view',
    title: 'List of posts',
    components: { Grid, /* PostCreateForm, PostEditForm */ },
    asyncData({ store }) {
      return store.dispatch('post/getPosts');
    },
    props: {
      type: String,
    },
    data() {
      return {
        updateData: false,
        columns: ['id', 'title', 'content', 'created_at'],
        actions: [{
          icon: '',
          text: '',
          async onClick(post) {
            return this.$store.dispatch('post/likePost', post.id);
          },
          // ?
          onClickAfter() {
            this.updateData = !this.updateData;
          }
        }],
      };
    },
    computed: {
      ...mapGetters('post', ['posts', 'meta']),
      ...mapGetters('auth', ['isAdmin']),
    },
    methods: {
      loadPosts({ page, orderBy, sort } = {}) {
        return this.$store.dispatch('post/getPosts', { page, orderBy, sort });
      },
      deletePost(id) {
        return this.$store.dispatch('post/deletePost', id);
      }
    }
  };
</script>


<template>
  <div>
    <h1>Backoffice</h1>
    <!--div>Add new user | List of users | Add new post | List of posts</div-->
    <h2>Add new user</h2>
    <UserCreateForm @create-user="updateUserData = !updateUserData"/>
    <h2>Users list</h2>
    <Grid
      entity-name="User"
      :meta="meta"
      :data="users"
      :update-data="updateUserData"
      :apiGetEntitiesMethod="loadUsers"
      :apiDeleteEntityMethod="deleteUser"
      :columns="['id', 'email', 'name', 'role', 'created_at']" />
    <h2>Add new post</h2>
    <PostCreateForm @create-post="updatePostData = !updatePostData"/>
    <h2>Posts list</h2>
    <Grid
      entity-name="Post"
      :meta="metaPosts"
      :data="posts"
      :update-data="updatePostData"
      :apiGetEntitiesMethod="loadPosts"
      :apiDeleteEntityMethod="deletePost"
      :columns="['id', 'title', 'total_likes', 'created_at']" />
  </div>
</template>

<script>
  import { mapGetters, createNamespacedHelpers } from 'vuex';
  import Grid from '@/components/ui/Grid/Grid.vue';
  import UserCreateForm from '@/components/Form/UserCreateForm.vue';
  import PostCreateForm from '@/components/Form/PostCreateForm.vue';
  import UserEditForm from '@/components/Form/UserEditForm.vue';

  const { mapState } = createNamespacedHelpers('post');

  export default {
    title: 'Backoffice',
    components: { Grid, UserCreateForm, UserEditForm, PostCreateForm },
    asyncData({ store }) {
      // special timeout (1 second) for progress bar testing
      return Promise.all([
        store.dispatch('user/getUsers'),
        store.dispatch('post/getPosts'),
        new Promise(res => setTimeout(res, 1e3))
      ]);
    },
    data() {
      return {
        editFormComponent: UserEditForm,
        updateUserData: false,
        updatePostData: false,
      };
    },
    computed: {
      ...mapGetters('user', ['users', 'meta']),
      ...mapGetters('post', ['posts']),
      ...mapState({
        metaPosts: state => state.meta,
      }),
      ...mapGetters('auth', ['isAdmin']),
    },
    methods: {
      /**
       * @param {Object} options
       * @param {Number} options.page
       * @param {Number} options.orderBy - ordered field
       * @param {Number} options.sort - asc or desc
       */
      loadUsers({ page, orderBy, sort } = {}) {
        return this.$store.dispatch('user/getUsers', { page, orderBy, sort });
      },
      /**
       * @param {Number} id
       */
      deleteUser(id) {
        return this.$store.dispatch('user/deleteUser', id);
      },
      loadPosts({ page, orderBy, sort } = {}) {
        return this.$store.dispatch('post/getPosts', { page, orderBy, sort });
      },
      deletePost(id) {
        return this.$store.dispatch('post/deletePost', id);
      }
    }
  };
</script>

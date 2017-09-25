<template>
  <div class="posts-view">
    <div class="posts-list-nav" v-if="displayedPage > 0">
      <div>
        <router-link v-if="page > 1" :to="'/' + type + '/' + (page - 1)">&lt; back</router-link>
        <a v-else class="disabled">&lt; back</a>
        <span><strong>{{ page }}</strong> / <strong>{{ maxPage }}</strong></span>
        <router-link v-if="hasMore" :to="'/' + type + '/' + (page + 1)">next &gt;</router-link>
        <a v-else class="disabled">next &gt;</a>
      </div>
    </div>
    <transition :name="transition">
      <div class="posts-list" :key="displayedPage" v-if="maxPage > 0">
        <transition-group name="item">
          <post v-for="item in displayedItems" :key="item.id" :item="item" />
        </transition-group>
      </div>
      <div v-else>
        {{ type | capitalize }} posts aren't found
      </div>
    </transition>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import Post from './Post.vue';

  export default {
    components: { Post },
    computed: {
      ...mapGetters('auth', ['isLoggedIn']),
      ...mapGetters('post', ['posts', 'meta']),
      page() {
        return Number(this.$route.params.page) || 1;
      },
      maxPage() {
        return this.meta.last_page;
      },
      hasMore() {
        return this.page < this.maxPage;
      },
    },
    props: {
      type: String,
    },
    beforeMount() {
      this.loadPosts();
    },
    data() {
      return {
        transition: 'slide-right',
        displayedPage: +this.$route.params.page || 1,
        displayedItems: this.posts,
      };
    },
    methods: {
      loadPosts(to = this.page, from = -1) {
        this.displayedItems = [];
        this.$bar.start();
        this.$store
          .dispatch('post/getPosts', { page: to, type: this.type })
          .then(() => {
            if (this.page < 0 || this.page > this.maxPage) {
              this.$router.replace(`/${this.type}/1`);
              return;
            }
            this.transition = (from === -1) ? null : (to > from ? 'slide-left' : 'slide-right'); // eslint-disable-line no-nested-ternary
            this.displayedPage = to;
            this.displayedItems = this.posts;
            this.$bar.finish();
          });
      },
    },
    watch: {
      page(to, from) {
        this.loadPosts(to, from);
      }
    },
  };
</script>

<<style lang="scss">

  .posts-list {
    transition: all .5s cubic-bezier(.55,0,.1,1);
  }

  .slide-left-enter, .slide-right-leave-to {
    opacity: 0;
    transform: translate(30px, 0);
  }
  .slide-left-leave-to, .slide-right-enter {
    opacity: 0;
    transform: translate(-30px, 0);
  }

  .posts-list-nav {
    text-align: center;
    height: 50px;
    margin-top: -30px;
    border-bottom: 15px solid #eee;
    margin-left: -50px;
    margin-right: -50px;
    color: #666;

    .disabled {
      color: #aaa;
    }

    span {
      padding: 0 10px;
    }
  }
</style>

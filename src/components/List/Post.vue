<template>
  <div class="posts-item">
    <div class="heart" :class="{ liked: item.liked }" @click="like(item)"></div>
    <div class="posts-item-title">
      <router-link :to="'/post/' + item.id">{{ item.title }}</router-link>
    </div>
    <div class="posts-item-content">
      Sint inventore occaecati sit eos nemo est. Itaque tenetur perspiciatis quia accusamus dicta. Corporis illo laudantium pariatur deserunt ex dolorem.
    </div>
    <div class="posts-item-meta">
      <span class="by">
        by <router-link :to="'/user/' + item.user.id"><strong>{{ item.user.name }}</strong></router-link> | 
      </span>
      <span class="time">
        {{ getLocalDate(item.created_at) | timeAgo }} ago | 
        Likes:
        <strong>
          <a :class="{ liked: item.liked }" href="" @click.prevent="like(item)">
            {{ item.total_likes }}
          </a>
        </strong>
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'posts-item',
    props: ['item'],
    computed: {
      url() {
        return `/posts/${this.item.id}`;
      }
    },
    methods: {
      getLocalDate({ date, timezone_type: hoursOffset }) {
        return +(new Date(date)) + (hoursOffset * 60 * 60 * 1000);
      },
      async like(item) {
        await this.$store.dispatch('post/likePost', item.id);
        item.liked = !item.liked; // eslint-disable-line no-param-reassign
        item.total_likes += item.liked ? 1 : -1; // eslint-disable-line no-param-reassign
      }
    }
  };
</script>

<<style lang="scss">

  .heart {
    position: absolute;
    right: -5px;
    bottom: -5px;
    float: right;
    width: 50px;
    height: 50px;
    background: url("/heart.png") no-repeat;
    background-position: 0 0;
    background-size: auto 50px;
    cursor: pointer;
    transition: background-position 1s steps(28);
    transition-duration: 0s;
    
    &.liked {
      transition-duration: 1s;
      background-position: -1400px 0;
    }
  }

  .posts-item {
    // @include tablet-landscape-and-below {
    //   margin: 8px 0;
    //   min-height: 120px;
    // }

    position: relative;
    background: #f4f4f4;
    padding: 8px 12px;
    width: 45%;
    float: left;
    margin: 10px 10px 5px 10px;
    height: 120px;

    &-title {
      font-weight: bold;
      font-size: 13px;
      line-height: 15px;
      padding: 5px 0;
    }

    &-content {
      font-size: 12px;
      line-height: 14px;
    }

    &-meta {
      font-size: 12px;
      color: #666;

      .liked {
        color: #e91e63;
      }

      a {
        color: #666;
      }
    }
  }
</style>

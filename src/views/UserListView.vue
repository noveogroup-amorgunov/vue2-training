<template>
  <div>
    <h1>User list</h1>
    <form class="add" @submit="additem">
      <div class="add-fields cf">
        <div class="form-item">
          <label class="form-label">Store name</label>
          <input class="form-input" v-model="store" type="text" placeholder="Beatport, iTunes, etc" />
        </div>
        <div class="form-item">
          <label class="form-label">Store link / URL</label>
          <input class="form-input" v-model="link" type="text" placeholder="http://tracksite.com/name-of-track" />
        </div>
      </div>
      <button type="submit" class="add-button" :class="{'active': isActive}">&plus;</button>
    </form>
    <ul class="add-list">
      <li v-for="item in users" class="cf" :key="item.id">
        <a :href="item.id" class="add-link" target="_blank">{{ item.id }}</a>
        <span class="add-title">{{ item.email }}</span>
        <span class="add">{{ item.name }} <span class="add-role">({{ item.role }})</span></span>
        <div class="modal-close add-remove" @click="() => remove(item)">
          <span></span>
          <span></span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'user-list-view',
    title: 'User list',
    asyncData ({ store, route: { params: { id }}}) {
      // special timeout for progress bar testing
      return Promise.all([store.dispatch('user/getUsers'), new Promise((res) => setTimeout(res, 1e3))]);
    },
    // beforeCreate() {
    //   this.$store.dispatch('user/getUsers');
    // },
    data() {
      return {
        store: '',
        link: '',
      }
    },
    computed: {
      ...mapGetters('user', ['users']),
    },
    methods: {
      additem(e) {
        e.preventDefault();
        this.items.push({
          store: this.store,
          link: this.link,
        });
        this.store = '';
        this.link = '';
      },
      remove(item) {
        this.items.$remove(item);
      }
    }
  };
</script>

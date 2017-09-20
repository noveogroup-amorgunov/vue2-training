<template>
  <!--
     @click="sortBy(key)" :class="{ active: sortKey == key }"
     @click="() => remove(item)"
  -->
  <div>
    <p v-if="!data.length"><i>{{entityName}}s hasn't existed yet.</i></p>
    <table v-else class="data-grid">
      <thead>
        <tr>
          <th v-for="(key, index) in columns" :key="index">
            <span class="data-grid-column" :class="{ active: key == sortKey}" @click="sortBy(key)">
              {{ key | capitalize }}&nbsp;<i :class="sortOrders[key] === 'desc' ? 'icon-down' : 'icon-up'"></i>
            </span>
          </th>
          <th v-if="isAdmin"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="entry in data" class="data-grid-item" :key="entry.id">
          <td v-for="(key, index) in columns" :key="index">
            <template v-if="key == 'id'">
              <a :href="entry[key]" class="add-link" target="_blank">{{entry[key]}}</a>
            </template>
            <template v-else>
              {{entry[key]}}
            </template>
          </td>
          <td v-if="isAdmin">
            <div class="modal-close add-remove" @click="confirmDelete(entry.id)">
              <span></span>
              <span></span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="form-item" v-if="error" :class="{ 'form-error': error }">
      <label class="form-label">{{ error }}</label>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import { modalTypes } from '@/store/modules/app';

  export default {
    name: 'data-grid',
    props: {
      columns: Array,
      data: Array,
      entityName: String,
      apiGetEntitiesMethod: {
        type: Function,
        default: () => () => {},
      },
      apiDeleteEntityMethod: {
        type: Function,
        default: () => () => {},
      }
    },
    data() {
      const sortOrders = {};
      this.columns.forEach((key) => { sortOrders[key] = 'desc'; });

      return {
        sortKey: 'id',
        sortOrders,
        error: '',
      };
    },
    computed: {
      ...mapGetters('auth', ['isAdmin']),
    },
    methods: {
      ...mapActions('app', ['showModal']),
      confirmDelete(id) {
        this.showModal({
          modalType: modalTypes.CONFIRM_DELETE_ENTITY,
          modalProps: {
            onSubmit: this.deleteItem.bind(this, id)
          }
        });
      },
      sortBy(key) {
        if (this.sortKey !== key) {
          this.sortOrders[this.sortKey] = 'desc';
        }
        this.sortKey = key;
        this.sortOrders[this.sortKey] = this.sortOrders[this.sortKey] === 'desc' ? 'asc' : 'desc';
        this.fetchData();
      },
      async fetchData() {
        this.error = '';
        this.$bar.start();
        await this.apiGetEntitiesMethod({ orderBy: this.sortKey, sort: this.sortOrders[this.sortKey] });
        this.$bar.finish();
      },
      async deleteItem(id) {
        try {
          this.$bar.start();
          await this.apiDeleteEntityMethod(id);
          await this.fetchData();
        } catch (err) {
          this.error = err.errors.pop().message;
        } finally {
          this.$bar.finish();
        }
      }
    },
    filters: {
      capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
      }
    },
  };
</script>
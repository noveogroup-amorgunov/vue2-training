<template>
  <div>
    <p v-if="!data.length"><i>{{entityName}}s hasn't existed yet or couldn't load.</i></p>
    <template v-else>
      <p><i v-if="meta.total">Total items: <strong>{{meta.total}}</strong></i>, <i>Current page: <strong>{{page}}</strong></i></p>
      <table class="data-grid">
        <thead>
          <tr>
            <th v-for="(key, index) in columns" :key="index">
              <span class="data-grid-column" :class="{ active: key == sortKey}" @click="sortBy(key)">
                {{ key | capitalize }}&nbsp;<i :class="sortOrders[key] === 'desc' ? 'icon-down' : 'icon-up'"></i>
              </span>
            </th>
            <!--th></th-->
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="entry in data" class="data-grid-item" :key="entry.id">
            <td v-for="(key, index) in columns" :key="index">
              <template v-if="key == 'id'">
                <a :href="getLink(entry[key])" title="Click to show item" class="add-link">
                  {{entry[key]}}
                </a>
              </template>
              <template v-else-if="key == 'created_at'">
                {{ new Date(entry[key].date) | timeAgo }} ago
              </template>
              <template v-else>
                {{entry[key]}}
              </template>
            </td>
            <!--td>
              <div class="modal-close add-remove" @click="confirmDelete(entry.id)">
                <span></span>
                <span></span>
              </div>
            </td-->
            <td>
              <dropdown
                :icon="'icon-more'"
                class="dropdown-left"
                :items="[
                  { text: 'Edit item', action: () => goToEdit(entry.id)},
                  { text: 'Delete item', action: () => confirmDelete(entry.id)},
                ]" />
            </td>
          </tr>
        </tbody>
      </table>
      <pagination
        :current-page="page"
        :total-items="meta.total || 0"
        :items-per-page="itemsPerPage"
        @page-changed="changePage"
      />
    </template>
    <div class="form-item" v-if="error" :class="{ 'form-error': error }">
      <label class="form-label">{{ error }}</label>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';
  import { modalTypes } from '@/store/modules/app';
  import { defaultPerPage } from '@/config';
  import Flyout from '@/components/ui/Flyout/Flyout.vue';
  import Dropdown from '@/components/ui/Dropdown/Dropdown.vue';
  import Pagination from '@/components/ui/Grid/Pagination.vue';

  export default {
    name: 'data-grid',
    components: { Flyout, Pagination, Dropdown },
    props: {
      meta: {
        type: Object,
        default: {},
      },
      columns: Array,
      data: Array,
      updateData: Boolean, // if change with value, data will be fetched again
      entityName: String,
      apiGetEntitiesMethod: {
        type: Function,
        default: () => () => {},
      },
      apiDeleteEntityMethod: {
        type: Function,
        default: () => () => {},
      },
      editView: Object,
      onEditView: Function,
      defaultPage: {
        type: Number,
        default: 1,
      }
    },
    watch: {
      updateData() {
        this.fetchData();
      }
    },
    data() {
      const sortOrders = {};
      this.columns.forEach((key) => { sortOrders[key] = 'desc'; });

      return {
        itemsPerPage: defaultPerPage,
        sortKey: 'id',
        sortOrders,
        error: '',
        page: this.defaultPage,
      };
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
        await this.apiGetEntitiesMethod({ page: this.page, orderBy: this.sortKey, sort: this.sortOrders[this.sortKey] });
        this.$bar.finish();
      },
      async changePage(page) {
        this.page = page;
        return this.fetchData();
      },
      async deleteItem(id) {
        try {
          this.$bar.start();
          await this.apiDeleteEntityMethod(id);
        } catch (err) {
          this.error = err.errors.pop().message;
        } finally {
          this.$bar.finish();
        }
      },
      getLink(id) {
        return `/${this.entityName.toLowerCase()}/${id}`;
      },
      goToEdit(id) {
        this.$router.push(`${this.getLink(id)}/edit`);
      }
    },
  };
</script>
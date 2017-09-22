<template>
  <div>
    <p v-if="!data.length"><i>{{entityName}}s hasn't existed yet.</i></p>
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
            <th v-if="isAdmin"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="entry in data" class="data-grid-item" :key="entry.id">
            <td v-for="(key, index) in columns" :key="index">
              <template v-if="key == 'id' && isAdmin">
                <flyout>
                  <template slot="dropdown-button">
                    <a title="Click to edit item"
                      @click.prevent
                      :href="entry[key]"
                      class="add-link"
                      >
                      {{entry[key]}}
                    </a>
                  </template>
                  <div slot="content" class="settigns cf">
                    <component :is="editView" :data="entry" @on-edit-view="onEditView" />
                    <h2>Page settings</h2>
                    <input
                        type="text"
                        label="Page title"
                        error="false"
                        message=""
                        value="Some page name"
                        placeholder="Placeholder text">
                    </input>
                    <input
                        type="text"
                        label="Page URL"
                        error="false"
                        message=""
                        value="some-page-name"
                        placeholder="Placeholder text">
                    </input>
                    <input
                        type="text"
                        label="Something else"
                        error="false"
                        message=""
                        value="Update this"
                        placeholder="Placeholder text">
                    </input>
                  </div>
                </flyout>
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
  import { mapGetters, mapActions } from 'vuex';
  import { modalTypes } from '@/store/modules/app';
  import { defaultPerPage } from '@/config';
  import Flyout from '@/components/Flyout/Flyout.vue';
  import Pagination from '@/components/Grid/Pagination.vue';

  export default {
    name: 'data-grid',
    components: { Flyout, Pagination },
    props: {
      meta: {
        type: Object,
        default: {},
      },
      columns: Array,
      data: Array,
      updateData: Boolean,
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
        await this.apiGetEntitiesMethod({ page: this.page, orderBy: this.sortKey, sort: this.sortOrders[this.sortKey] });
        this.$bar.finish();
      },
      async changePage(page) {
        this.page = page;
        this.$router.replace(`/${this.entityName.toLowerCase()}s/page/${page}`);
        return this.fetchData();
      },
      async deleteItem(id) {
        try {
          this.$bar.start();
          await this.apiDeleteEntityMethod(id);
          // await this.fetchData();
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
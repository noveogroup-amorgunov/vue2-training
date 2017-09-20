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
          <th></th>
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
          <td>
            <div class="modal-close add-remove">
              <span></span>
              <span></span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    name: 'data-grid',
    props: {
      columns: Array,
      data: Array,
      entityName: String,
      apiGetEntitiesMethod: Function,
    },
    data() {
      const sortOrders = {};
      this.columns.forEach((key) => { sortOrders[key] = 'desc'; });

      return {
        sortKey: 'id',
        sortOrders,
      };
    },
    methods: {
      sortBy(key) {
        if (this.sortKey !== key) {
          this.sortOrders[this.sortKey] = 'desc';
        }
        this.sortKey = key;
        this.sortOrders[this.sortKey] = this.sortOrders[this.sortKey] === 'desc' ? 'asc' : 'desc';
        this.fetchData();
      },
      async fetchData() {
        // TODO: disable grid, show loader
        this.$bar.start();
        await this.apiGetEntitiesMethod({ orderBy: this.sortKey, sort: this.sortOrders[this.sortKey] });
        this.$bar.finish();
      },
    },
    filters: {
      capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
      }
    },
  };
</script>
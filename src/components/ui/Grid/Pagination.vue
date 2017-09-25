<template>
  <ul class="pagination">
    <li class="page-item" :class="{ disabled: disabled('first') }">
      <a class="page-link" href="#" @click.prevent="pageChanged(1)" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    <li class="page-item" v-for="(index, n) in paginationRange" :class="{ active: activePage(n + 1) }" v-bind:key="index">
      <a class="page-link" href="" @click.prevent="pageChanged(n + 1)">{{ n + 1 }}</a>
    </li>
    <li class="page-item" :class="{ disabled: disabled('last') }">
      <a class="page-link" href="" @click.prevent="pageChanged(lastPage)" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</template>

<script>
  export default {
    props: {
      currentPage: {
        type: Number,
        required: true
      },
      totalPages: Number,
      itemsPerPage: Number,
      totalItems: Number,
      visiblePages: {
        type: Number,
        default: 10,
        coerce: val => +val
      }
    },
    computed: {
      lastPage() {
        if (this.totalPages) {
          return this.totalPages;
        }
        return this.totalItems % this.itemsPerPage === 0
          ? this.totalItems / this.itemsPerPage
          : Math.floor(this.totalItems / this.itemsPerPage) + 1;
      },
      paginationRange() {
        let start;
        if (this.currentPage - (this.visiblePages / 2) <= 0) {
          start = 1;
        } else if (this.currentPage + (this.visiblePages / 2) > this.lastPage) {
          start = this.lowerBound(this.lastPage - (this.visiblePages + 1), 1);
        } else {
          start = Math.ceil(this.currentPage - (this.visiblePages / 2));
        }

        const range = [];

        for (let i = 0; i < this.visiblePages && i < this.lastPage; i++) {
          range.push(start + i);
        }

        return range;
      }
    },
    methods: {
      lowerBound(num, limit) {
        return num >= limit ? num : limit;
      },
      disabled(page) {
        if (page === 'first' && this.currentPage === 1) {
          return true;
        } else if (page === 'last' && this.currentPage === this.lastPage) {
          return true;
        }
        return false;
      },
      activePage(pageNum) {
        return this.currentPage === pageNum;
      },
      pageChanged(pageNum) {
        this.$emit('page-changed', pageNum);
      }
    }
  };
</script>

<style lang="scss">
  .pagination {

    &:after {
      display: block;
      clear: both;
      content: '';
    }
    margin: 20px 0;

    li {
      float: left;
    }

    .page-link {
      position: relative;
      display: block;
      padding: 8px 12px;
      padding: .5rem .75rem;
      margin-left: -1px;
      line-height: 1.25;
      // color: #007bff;
      background-color: #fff;
      border: 1px solid #ddd;
    }

    .page-item:first-child .page-link {
      margin-left: 0;
      border-top-left-radius: 4px;
      border-top-left-radius: .25rem;
      border-bottom-left-radius: 4px;
      border-bottom-left-radius: .25rem;
    }

    .page-item:last-child .page-link {
      margin-right: 0;
      border-top-right-radius: 4px;
      border-top-right-radius: .25rem;
      border-bottom-right-radius: 4px;
      border-bottom-right-radius: .25rem;
    }

    .page-link:focus, .page-link:hover {
      text-decoration: none;
      background-color: #e9ecef;
      border-color: #ddd;
    }

    .page-item.disabled {
      cursor: not-allowed;
      opacity: .65;
    }

    .page-item.disabled .page-link {
      color: #868e96;
      pointer-events: none;
      background-color: #fff;
      border-color: #ddd;
    }

    .page-item.active .page-link {
      z-index: 2;
      color: #fff;
      background-color: #4594f4;
      border-color: #4594f4;
    }
  }
</style>
<template>
    <div :class="{ open: show }">
        <button
            class="dropdown-button"
            aria-expanded="show"
            @click="toggle($event)"
            :disabled="disabled">
            <span><i class="icon-more"></i></span>
        </button>
        <ul class="dropdown-menu">
          <li class="dropdown-item" v-for="item in items" :key="item.id" @click="item.action()">{{item.text}}</li>
        </ul>
    </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    data() {
      return {
        show: false
      };
    },
    props: {
      text: {
        type: String,
        default: ''
      },
      items: Array,
      disabled: {
        type: Boolean,
        default: false
      },
    },
    computed: {
      ...mapGetters('app', ['isOpenDropdowns']),
    },
    watch: {
      isOpenDropdowns(value) {
        if (!value) {
          this.show = false;
        }
      },
    },
    methods: {
      ...mapActions('app', ['closeDropdowns', 'openDropdowns']),
      toggle(e) {
        this.show = !this.show;
        if (this.show) {
          this.openDropdowns();
          e.stopPropagation();
        } else {
          this.closeDropdowns();
        }
      },
      clicked() {
        this.show = false;
      }
    },
  };
</script>
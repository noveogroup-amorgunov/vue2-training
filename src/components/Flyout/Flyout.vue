<template>
  <div :class="{ open: show }">
    <span
      @click="toggle($event)">
      <span class="dropdown-settings"><i class="icon-settings"></i></span>
    </span>
    <ul class="dropdown-flyout dropdown-arrow" @click.stop>
      <slot name="content"></slot>
      <button class="button button-general" @click="toggle($event)">Update</button>
    </ul>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
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
    data() {
      return {
        show: false,
      };
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
      }
    },
  };
</script>
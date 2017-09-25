<template>
  <div class="form-item" :class="{ 'form-error': hasError, open: show }">
    <label v-if="hasError" class="form-label" :for="name">{{ errorText }}</label>
    <label v-else class="form-label" :for="name">{{ label }}</label>

    <div class="form-select" @click="toggle($event)">
      {{ selected }}
      <span class="dropdown-caret"><i class="icon-down"></i></span>
    </div>
    <ul class="form-select-dropdown">
      <li
        v-for="option in options"
        v-bind:key="option.value"
        @click="select(option)"
        class="dropdown-item">
        {{ option.name }}
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    computed: {
      ...mapGetters('app', ['isOpenDropdowns']),
    },
    props: {
      name: {
        type: String,
        required: true,
      },
      defaultValue: {
        type: String,
        default: '',
      },
      type: String,
      label: String,
      hasError: Boolean,
      placeholder: String,
      errorText: String,
      options: Array,
      onChange: Function,
    },
    data() {
      const initialData = {
        show: false,
        selected: 'Default',
        selectedValue: '',
      };

      this.options.forEach((option) => {
        if (this.defaultValue === option.value) {
          initialData.selected = option.name;
          initialData.selectedValue = option.value;
        }
      });

      return initialData;
    },
    watch: {
      selected() {
        this.onChange(this.selectedValue);
      },
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
      select(option) {
        this.show = false;
        this.selected = option.name;
        this.selectedValue = option.value;
      }
    },
  };
</script>

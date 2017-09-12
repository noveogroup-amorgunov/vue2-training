<template>
  <div class="field">
    <div class="control" :class="{ 'has-icons-left': iconClass }">
      <input
        v-if="name == 'password'"
        type="password"
        class="input"
        :class="{ 'is-danger': hasErrors }"
        v-model="value"
        v-validate="validateRules"
        :placeholder="placeholder"
        :name="name"
         @change="change" />
      <input
        v-else
        class="input"
        :class="{ 'is-danger': hasErrors }"
        v-model="value"
        v-validate="validateRules"
        :placeholder="placeholder"
        :name="name"
         @change="change" />

      <span v-if="iconClass" class="icon is-small is-left"><i class="fa" :class="iconClass"></i></span>
      <span v-show="hasErrors" class="help is-danger">{{ errors.first(name) }}</span>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      name: {
        type: String,
        required: true,
      },
      defaultValue: {
        type: String,
        default: '',
      },
      showErrors: Boolean,
      placeholder: String,
      iconClass: String,
      validateRules: {
        type: [String, Object],
        default: () => ({}),
      },
    },
    data() {
      return {
        value: this.defaultValue,
      };
    },
    computed: {
      hasErrors() {
        return this.showErrors && this.errors.has(this.name) && (this.fields[this.name].dirty || this.showErrors);
      },
    },
    methods: {
      change() {
        this.$emit('input-changed', {
          name: this.name,
          value: this.value,
        });
      },
    },
  };
</script>
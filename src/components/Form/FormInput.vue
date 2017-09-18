<template>
  <div class="form-group row" :class="{ 'has-danger' : errors.has(name) }">
    <label class="form-control-label" :for="name">{{ label }}</label>

    <input v-if="type == 'password'"
      type="password"
      v-model="innerValue"
      :class="{ 'input': 'true', 'is-danger': hasError }"
      :name="name"
      :placeholder="placeholder ? placeholder : name" />
    <input v-else
      type="text"
      v-model="innerValue"
      :class="{ 'input': 'true', 'is-danger': hasError }"
      :name="name"
      :placeholder="placeholder ? placeholder : name" />
  
    <div class="form-control-feedback" v-if="hasError">{{ errorText }}</div>
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
    type: String,
    label: String,
    hasError: Boolean,
    placeholder: String,
    errorText: String,
  },
  data() {
    return {
      innerValue: this.defaultValue
    };
  },
  watch: {
    innerValue(value) {
      this.$emit('input', value);
    }
  }
};
</script>

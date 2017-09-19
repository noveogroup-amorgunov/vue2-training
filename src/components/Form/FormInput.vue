<template>

  <div class="form-item" :class="{ 'form-error': hasError }">
    <label v-if="hasError" class="form-label" :for="name">{{ errorText }}</label>
    <label v-else class="form-label" :for="name">{{ label }}</label>

    <input v-if="type == 'password'"
      type="password"
      v-model="innerValue"
      :class="{ 'input': 'true', 'form-input': true }"
      :name="name"
      :placeholder="placeholder ? placeholder : name" />
    <input v-else
      type="text"
      v-model="innerValue"
      :class="{ 'input': 'true', 'form-input': true }"
      :name="name"
      :placeholder="placeholder ? placeholder : name" />
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

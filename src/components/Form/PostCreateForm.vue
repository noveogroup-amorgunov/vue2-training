<template>
  <form class="add" >
    <input style="display:none" type="text" name="fakeusernameremembered"/>

    <div class="add-fields cf">
      <form-input
        name="title"
        label="Title"
        v-validate="'required|min:3'"
        data-vv-value-path="innerValue"
        v-model="post.title"
        :has-error="errors.has('title')"
        :error-text="errors.first('title')"
        placeholder="Post title" />

      <form-input
        name="content"
        label="Content"
        v-validate="'required|min:3'"
        data-vv-value-path="innerValue"
        v-model="post.content"
        :has-error="errors.has('content')"
        :error-text="errors.first('content')"
        placeholder="Content" />
    </div>
    </div>

    <div :class="{ 'form-error': errors.has('common') }">
      <p v-show="errors.has('common')" class="form-label">
        {{ errors.first('common') }}
      </p>
    </div>
    <button
      :disabled="loading"
      :class="{ 'button-disabled': loading }"
      @click.prevent="submitForm()"
      type="submit"
      class="add-button">
      &plus;
    </button>
  </form>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import FormSelect from '@/components/ui/Form/FormSelect.vue';
  import FormInput from '@/components/ui/Form/FormInput.vue';

  export default {
    components: { FormSelect, FormInput },
    data() {
      return {
        post: {
          title: '',
          content: '',
        }
      };
    },
    computed: {
      ...mapGetters('post', ['posts', 'loading']),
    },
    methods: {
      ...mapActions('post', ['createPost']),
      async submitForm() {
        this.errors.clear();
        try {
          if (await this.$validator.validateAll()) {
            this.$bar.start();
            await this.createPost(this.post);
            Object.keys(this.post).forEach((key) => {
              this.post[key] = '';
            });
            this.$validator.reset();
            this.$emit('create-post');
          }
        } catch (err) {
          err.errors.forEach(error => this.errors.add(error.key, error.message));
        } finally {
          this.$bar.finish();
        }
      },
    },
  };
</script>
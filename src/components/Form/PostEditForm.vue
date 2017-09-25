<template>
  <form class="add" >
    <input style="display:none" type="text" name="fakeusernameremembered"/>
    <input style="display:none" type="password" name="fakepasswordremembered"/>

    <div class="add-fields cf">
      <form-input
        name="title"
        label="Title"
        v-validate="'required|min:3'"
        data-vv-value-path="innerValue"
        v-model="post.title"
        :default-value="post.title"
        :has-error="errors.has('title')"
        :error-text="errors.first('title')" />

      <form-input
        name="content"
        label="Content"
        v-validate="'required|min:3'"
        data-vv-value-path="innerValue"
        :default-value="post.content"
        v-model="post.content"
        :has-error="errors.has('content')"
        :error-text="errors.first('content')" />
    </div>

    <div :class="{ 'form-error': errors.has('common') }">
      <p v-show="errors.has('common')" class="form-label">
        {{ errors.first('common') }}
      </p>
    </div>

    <div class="form-buttons">
      <button
        :disabled="loading"
        :class="{ 'button-disabled': loading }"
        @click.prevent="submitForm()"
        type="submit"
        class="button button-action button-left">
        Edit post
      </button>

      <button
        :disabled="loading"
        :class="{ 'button-disabled': loading }"
        @click.prevent="goBack()"
        type="submit"
        class="button button-warning button-left">
        Go back
      </button>
    </div>
  </form>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import FormSelect from '@/components/ui/Form/FormSelect.vue';
  import FormInput from '@/components/ui/Form/FormInput.vue';

  export default {
    components: { FormSelect, FormInput },
    props: {
      data: {
        type: Object,
        default: {},
      },
    },
    data() {
      return {
        post: {
          title: this.data.title,
          content: this.data.content,
        }
      };
    },
    computed: {
      ...mapGetters('post', ['loading']),
    },
    methods: {
      ...mapActions('post', ['editPost']),
      goBack() {
        this.$router.back();
      },
      async submitForm() {
        this.errors.clear();
        try {
          if (await this.$validator.validateAll()) {
            this.$bar.start();
            await this.editPost({ id: this.data.id, data: this.post });
            this.goBack();
          }
        } catch (err) {
          err.errors.forEach(error => this.errors.add(error.key, error.message));
        } finally {
          this.$bar.finish();
        }
      },
      changeRole(role) {
        this.user.role = role;
      }
    },
  };
</script>

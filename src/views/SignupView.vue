<template>
  <div>
    <h1>Sign up</h1>
    <div class="grid-form cf">
      <form>
        <form-input
          name="email"
          label="Email"
          v-validate="'required|email'"
          data-vv-value-path="innerValue"
          v-model="credentials.email"
          :has-error="errors.has('email')"
          :error-text="errors.first('email')"
          placeholder="Email" />
        
        <form-input
          name="name"
          label="Name"
          v-validate="'required|min:3'"
          data-vv-value-path="innerValue"
          v-model="credentials.name"
          :has-error="errors.has('name')"
          :error-text="errors.first('name')"
          placeholder="Name" />

        <form-input
          type="password"
          name="password"
          label="Password"
          v-validate="'required|min:3'"
          data-vv-value-path="innerValue"
          v-model="credentials.password"
          :has-error="errors.has('password')"
          :error-text="errors.first('password')"
          placeholder="Password" />

        <div :class="{ 'form-error': errors.has('common') }">
          <p v-show="errors.has('common')" class="form-label">
            {{ errors.first('common') }}
          </p>
        </div>

        <div class="form-buttons">
          <button
            :disabled="loading"
            class="button button-left"
            :class="{ 'button-disabled': loading, 'button-general': !loading }"
            @click.prevent="submitForm()">
            Sign up
          </button>
          <button
            type="reset"
            @click="errors.clear()"
            class="button button-warning button-left">
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import FormInput from '@/components/Form/FormInput.vue';
  import validationService from '@/services/validation';

  export default {
    name: 'signup-view',
    title: 'Sign up page',
    components: { FormInput },
    data() {
      return {
        credentials: {
          email: '',
          password: '',
          name: '',
        },
      };
    },
    computed: {
      ...mapGetters('auth', ['loading']),
    },
    methods: {
      ...mapActions('auth', ['register']),
      async submitForm() {
        try {
          if (await this.$validator.validateAll()) {
            this.$bar.start();
            await this.register(this.credentials);
            this.$router.push({ name: 'home' });
          }
        } catch(err) {
          this.errors.add('common', err.errors);
        } finally {
          this.$bar.finish();
        }
      },
    },
    /*asyncData ({ store, route: { params: { id }}}) {
      console.log('Load async data in sign up component!!')
      return new Promise((resolve) => {
          setTimeout(resolve, 2000);
      });
    },*/
  };
</script>

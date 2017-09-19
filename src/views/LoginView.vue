<template>
  <div>
    <h1>Login form</h1>
    <div class="grid-form cf">
      <form>
        <input style="display:none" type="text" name="fakeusernameremembered"/>
        <input style="display:none" type="password" name="fakepasswordremembered"/>
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
            Login
          </button>
          <button
            type="reset"
            @click="clearForm()"
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

  export default {
    title: 'Login page',
    components: { FormInput },
    data() {
      return {
        credentials: {
          email: '',
          password: '',
        },
      };
    },
    computed: {
      ...mapGetters('auth', ['loading']),
    },
    methods: {
      ...mapActions('auth', ['login']),
      clearForm() {
        this.errors.clear();
        Object.keys(this.credentials).forEach(key => this.credentials[key] = '');
      },
      async submitForm() {
        try {
          if (await this.$validator.validateAll()) {
            this.$bar.start();
            await this.login(this.credentials);
            this.$router.push({ name: 'home' });
          }
        } catch(err) {
          err.errors.forEach(error => this.errors.add(error.key, error.message));
        } finally {
          this.$bar.finish();
        }
      },
    },
  };


/*export default {
  name: 'user-view',

  computed: {
    user () {
      return this.$store.state.users[this.$route.params.id]
    }
  }
  asyncData ({ store, route: { params: { id }}}) {
    return new Promise((resolve) => {
        setTimeout(resolve, 1000);
    });
    
    // store.dispatch('FETCH_USER', { id })
  },
  title () {
    return this.user
      ? this.user.id
      : 'User not found'
  }
}*/
</script>

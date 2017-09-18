<template>
  <div>
    <h1>Login form</h1>
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
        type="password"
        name="password"
        label="Password"
        v-validate="'required|min:3'"
        data-vv-value-path="innerValue"
        v-model="credentials.password"
        :has-error="errors.has('password')"
        :error-text="errors.first('password')"
        placeholder="Password" />

        <div class="field is-grouped is-grouped-centered">
            <div class="control">
                <button
                  :disabled="loading"
                  :class="{ 'is-loading': loading }"
                  class="button is-primary"
                  @click.prevent="submitForm()">
                  Login
                </button>
            </div>
           <div class="control">
                <button
                  type="reset"
                  class="button is-light">
                  Cancel
                </button>
            </div>
        </div>
        <p
          v-show="errors.has('common')"
          class="help is-danger">
          {{ errors.first('common') }}
        </p>
    </form>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import FormInput from '@/components/Form/FormInput.vue';
  import validationService from '@/services/validation';

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
      async submitForm() {
        try {
          // setTimeout(() => this.$bar.finish(), 3000);
          // await validationService.validateForm(this);
          // component.errors.clear();
          this.$validator.validateAll();
          if (!this.errors.any()) {
            this.$bar.start();
            await this.login(this.credentials);
            
            this.$router.push({ name: 'home' });
          }
        } catch(err) {
          console.dir(err);
          console.log('ADD ERRORS!');
          
          // this.$bar.finish();
          // validationService.addErrors(err, this)
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

<template>
  <div>
    <h1>Login</h1>
    <form>
        <input-text
            name="email"
            placeholder="Email"
            validateRules="required|email"
            :showErrors="submitted"
            @input-changed="inputChanged"
            iconClass="fa-envelope">
        </input-text>

        <input-text
            name="password"
            placeholder="Password"
            validateRules="required|min:3"
            :showErrors="submitted"
            @input-changed="inputChanged"
            iconClass="fa-lock">
        </input-text>

        <div class="field is-grouped is-grouped-centered">
            <div class="control">
                <button
                  :disabled="pending"
                  :class="{ 'is-loading': pending }"
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
          v-show="submitted && errors.has('common')"
          class="help is-danger">
          {{ errors.first('common') }}
        </p>
    </form>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import InputText from '@/components/Form/InputText.vue';
  import validationService from '@/services/validation';

  export default {
    title: 'Login page',
    components: { InputText },
    data() {
      return {
        form: {
          email: '',
          password: '',
        },
        submitted: false,
      };
    },
    computed: {
      ...mapGetters('auth', ['pending']),
    },
    methods: {
      ...mapActions('auth', ['login']),
      inputChanged({ name, value }) {
        this.form[name] = value;
      },
      async submitForm() {
        try {

          // this.$bar.start();
          // setTimeout(() => this.$bar.finish(), 3000);

          this.submitted = true;
          const valid = await validationService.isValidForm(this);
          console.log(`VALID FORM: ${valid}!`);

          // console.log();
          // await this.$store.dispatch('auth/login', this.form);
          await this.login(this.form);
          // this.$router.push({ name: 'home' });
        } catch(err) {
          console.log('ADD ERRORS!');
          validationService.addErrors(err, this)
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

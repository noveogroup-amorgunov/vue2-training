<template>
  <form class="add" >
    <input style="display:none" type="text" name="fakeusernameremembered"/>
    <input style="display:none" type="password" name="fakepasswordremembered"/>

    <div class="add-fields cf">
      <form-input
        name="email"
        label="Email"
        v-validate="'required|email'"
        data-vv-value-path="innerValue"
        v-model="user.email"
        :has-error="errors.has('email')"
        :error-text="errors.first('email')"
        placeholder="admin@vuejs.com" />

      <form-input
        type="password"
        name="password"
        label="Password"
        v-validate="'required|min:3'"
        data-vv-value-path="innerValue"
        v-model="user.password"
        :has-error="errors.has('password')"
        :error-text="errors.first('password')"
        placeholder="Password" />
    </div>

    <div class="add-fields cf">
      <form-input
        name="name"
        label="Name"
        v-validate="'required|alpha_spaces'"
        data-vv-value-path="innerValue"
        v-model="user.name"
        :has-error="errors.has('name')"
        :error-text="errors.first('name')"
        placeholder="Name" />

      <form-select
        name="role"
        label="Role"
        :on-change="changeRole"
        :has-error="errors.has('role')"
        :error-text="errors.first('role')"
        :options="roles"
      />
    </div>

    <div :class="{ 'form-error': errors.has('common') }">
      <p v-show="errors.has('common')" class="form-label">
        {{ errors.first('common') }}
      </p>
    </div>

    <div class="form-buttons"></div>
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
  import FormSelect from '@/components/Form/FormSelect.vue';
  import FormInput from '@/components/Form/FormInput.vue';

  export default {
    components: { FormSelect, FormInput },
    data() {
      return {
        roles: [{
          name: 'User',
          value: 'user',
        }, {
          name: 'Admin',
          value: 'admin',
        }],
        user: {
          role: 'user',
          email: '',
          password: '',
          name: '',
        }
      };
    },
    computed: {
      ...mapGetters('user', ['users', 'loading', 'getUserByEmail']),
    },
    methods: {
      ...mapActions('user', ['editUser', 'createUser']),
      async submitForm() {
        this.errors.clear();
        try {
          if (await this.$validator.validateAll()) {
            this.$bar.start();
            await this.createUser(this.user);
            const createdUser = this.getUserByEmail(this.user.email);
            if (this.user.role === 'admin' && createdUser) {
              await this.editUser({ id: createdUser.id, data: { role: this.user.role } });
            }
            Object.keys(this.user).forEach((key) => {
              this.user[key] = '';
            });
            this.$validator.reset();
            this.$emit('create-user');
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
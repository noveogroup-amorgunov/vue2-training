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
        :default-value="user.email"
        :has-error="errors.has('email')"
        :error-text="errors.first('email')"
        placeholder="admin@vuejs.com" />

      <form-input
        type="password"
        name="password"
        label="Password"
        v-validate="'min:3'"
        data-vv-value-path="innerValue"
        :default-value="user.password"
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
        :default-value="user.name"
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
        :selected-value="user.role"
        :default-value="user.role"
      />
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
        Edit user
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
        roles: [{
          name: 'User',
          value: 'user',
        }, {
          name: 'Admin',
          value: 'admin',
        }],
        user: {
          role: this.data.role,
          email: this.data.email,
          password: this.data.password,
          name: this.data.name,
        }
      };
    },
    computed: {
      ...mapGetters('user', ['loading']),
    },
    methods: {
      ...mapActions('user', ['editUser']),
      goBack() {
        this.$router.back();
      },
      async submitForm() {
        this.errors.clear();
        try {
          if (await this.$validator.validateAll()) {
            this.$bar.start();

            const data = { ...this.user };

            if (!this.user.password) {
              data.password = undefined;
            }
            if (data.email === this.data.email) {
              data.email = undefined;
            }

            await this.editUser({ id: this.data.id, data });
            this.$emit('edit-user');
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

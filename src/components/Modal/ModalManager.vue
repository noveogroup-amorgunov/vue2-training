<template>
    <component :is="modalComponent" />
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import { modalTypes } from '@/store/modules/app';
  import ConfirmLogoutModal from './ConfirmLogoutModal';
  import ConfirmDeleteEntityModal from './ConfirmDeleteEntityModal';

  const modalsComponents = {
    [modalTypes.CONFIRM_DELETE_ENTITY]: ConfirmDeleteEntityModal,
    [modalTypes.CONFIRM_LOGOUT]: ConfirmLogoutModal,
  }

  export default {
    props: ['onSubmit'],
    components: { ConfirmLogoutModal, ConfirmDeleteEntityModal },
    computed: {
      ...mapGetters('app', ['isShowModal', 'modal']),
      modalComponent() {
        return this.modal
          ? modalsComponents[this.modal.modalType]
          : ConfirmLogoutModal;
      }
    },
    methods: {
      ...mapActions('app', ['hideModal'])
    }
  };
</script>
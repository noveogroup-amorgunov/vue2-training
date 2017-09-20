<template>
  <div class="modal-mask" v-show="isShowModal" transition="modal">
    <div class="modal-wrapper">
      <div class="modal-container">
        <component :is="modalComponent" />
        <div class="modal-header">
          <h3 class="t-header-sub" slot="header">1234</h3>
          <div class="modal-close" @click="hideModal()">
            <span></span>
            <span></span>
          </div>
        </div>
        <div class="modal-body">
          <slot name="content">default body</slot>
        </div>

        <div class="modal-footer cf">
          <button class="button button-warning" @click="hideModal()">Close modal</button>
        </div>
      </div>
    </div>
  </div>
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

  console.log(ConfirmLogoutModal.header);

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
<template>
  <transition name="modal">
    <div class="modal-mask" v-show="isShowModal" transition="modal" @click="hideModal()" >
      <div class="modal-wrapper">
        <div class="modal-container" @click.stop>
          <div class="modal-header">
            <h3 class="t-header-sub"><slot name="header">Default header</slot></h3>
            <div class="modal-close" @click="hideModal()">
              <span></span>
              <span></span>
            </div>
          </div>
          <div class="modal-body">
            <slot name="content"></slot>
          </div>
          <div class="modal-footer cf">
            <button class="button button-warning" @click="hideModal()">Close modal</button>
            <button v-show="submit" class="button button-action" @click="confirmModal()">{{actionText}}</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    props: ['submit', 'actionText'],
    computed: {
      ...mapGetters('app', ['isShowModal', 'modal']),
    },
    mounted() {
  	  document.addEventListener('keydown', this.onKeyDown)
    },
    beforeDestroy() {
      document.removeEventListener('keydown', this.onKeyDown)
    },
    methods: {
      ...mapActions('app', ['hideModal']),
      confirmModal() {
        this.submit();
        this.hideModal();
      },
      onKeyDown(e) {
        console.log('onKeyDown');
        if (this.isShowModal && e.keyCode == 27) {
          this.hideModal();
        }
      }
    },
  };
</script>
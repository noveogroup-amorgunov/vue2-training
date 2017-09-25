<template>
    <BaseModal :submit="onSubmit" action-text="delete">
        <template slot="header">Confirm delete</template>
        <template slot="content">Are you sure to delete that item?</template>
        <slot name="confirmButtom"></slot>
    </BaseModal>
</template>

<script>
  import BaseModal from './BaseModal.vue';

  export default {
    components: { BaseModal },
    props: {
      onSubmit: Function
    },
  };
</script>
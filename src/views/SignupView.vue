<template>
  <div>
    <h1>Sign up</h1>
  </div>
</template>

<script>
export default {
  name: 'signup-view',
  title: 'Sign up',
  asyncData ({ store, route: { params: { id }}}) {
    console.log('Load async data in sign up component!!')
    return new Promise((resolve) => {
        setTimeout(resolve, 2000);
    });
  },
}
</script>
<template>
  <div class="config-panel">
    <div class="config-panel__header">
      <h2>{{ $route.meta.title }}</h2>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: '',

  data () {
    return {

    }
  }
}
</script>

<style lang="scss">
@import '../assets/scss/variables.scss';

.config-panel {
  padding: 40px;
  overflow-y: auto;
  h2 {
    line-height: 0;
  }
  &__header {
    margin-bottom: 40px;
  }
}
</style>

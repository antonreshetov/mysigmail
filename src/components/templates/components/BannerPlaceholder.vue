<template>
  <tr>
    <div :style="style">
      <p style="color: #aaa; font-size: 14px;">Banner</p>
    </div>
  </tr>
</template>

<script>
export default {
  name: 'BannerPlaceholder',

  data () {
    return {
      style: {
        display: 'flex',
        height: '100px',
        backgroundColor: '#eee',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }
  }
}
</script>

<style lang="scss">

</style>

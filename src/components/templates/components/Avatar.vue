<template>
  <div
    v-if="src && showAvatar"
    style="margin-right: 10px; background: #eee;"
    :style="{
      'height': size + 'px',
      'width': size + 'px',
      'border-radius': roundness + 'px'
    }"
  >
    <img
      :src="src"
      :style="{
        'width': size + 'px',
        'height': size + 'px',
        'border-radius': roundness + 'px',
      }"
      alt="avatar"
    >
  </div>
</template>

<script>
export default {
  name: 'Avatar',
  props: {
    showAvatar: { type: Boolean, required: true },
    src: { type: String, required: true },
    size: { type: Number, required: true },
    roundness: { type: Number, required: true }
  }
}
</script>

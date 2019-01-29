<template>
  <div>
    <img
      v-if="image"
      :src="image"
      :style="{
        'width': size + 'px',
        'height': size + 'px',
        'border-radius': roundness + 'px',
      }"
      alt="avatar"
    >
    <div
      v-else
      style="margin-right: 10px; background: #eee;"
      :style="{
        'height': size + 'px',
        'width': size + 'px',
        'border-radius': roundness + 'px'
      }"
    />
  </div>
</template>

<script>
export default {
  name: 'Avatar',
  props: {
    src: { type: String, required: true },
    size: { type: Number, required: true },
    roundness: { type: Number, required: true }
  }
}
</script>

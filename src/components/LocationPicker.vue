<template>
  <div class="location-picker">
    <fieldset>
      <legend>For location</legend>
      <label for="latitude">Latitude</label>
      <input type="number" id="latitude" v-model="location.latitude" />
      <label for="longitude">Longitude</label>
      <input type="number" id="longitude" v-model="location.longitude" />
    </fieldset>
    <button @click="updateAction">Get weather for this position</button>
  </div>
</template>

<script>
export default {
  name: 'LocationPicker',
  props: {
    location: {
      type: Object,
      default: () => ({ latitude: null, longitude: null })
    }
  },
  methods: {
    updateAction: function() {
      this.$emit('location-change', this.location)
    }
  }
}
</script>

<style scoped></style>

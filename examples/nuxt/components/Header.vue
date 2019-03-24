<template>
  <div class="header-header">
    <div
      v-bind:style="{ backgroundImage: 'url(' + icon + ')' }"
      class="header-icon"
      v-if="icon !== undefined"
    />
    {{ title }}
  </div>
</template>

<script>
export default {
  props: ["icon", "title"]
};
</script>

<style>
.header-header {
  color: #ffffff;
  background-color: #000000;
  height: 3em;
  display: flex;
  justify-content: center;
  align-items: center;
}

.header-icon {
  width: 25px;
  height: 25px;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 50%;
  margin-right: 10px;
  background-position: center;
  background-color: #ffffff;
}
</style>

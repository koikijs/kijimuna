<template>
  <div class="left-panel-navigation">
    <h1 class="left-panel-title">Organizations</h1>
    <ul class="left-panel-list">
      <li class="left-panel-item" v-for="group in groups">
        <nuxt-link
          v-bind:to="'/groups/' + encodeURIComponent(group.id)"
          class="left-panel-link"
          active-class="left-panel-link-active"
        >
          <div
            class="left-panel-icon"
            v-bind:style="{ backgroundImage: 'url(' + group.icon + ')' }"
          />
          {{ group.id }}
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["user", "groups", "selected"]
};
</script>
<style>
.left-panel-title {
  font-size: 1.3em;
  display: flex;
  align-items: center;
  padding-left: 10px;
}

.left-panel-navigation {
  display: flex;
  color: #000000;
  background-color: #4ec5c1;
  width: 250px;
  max-width: 250px;
  font-weight: 300;
  flex-direction: column;
  padding: 20px 0;

  @media (max-width: 700px) {
    .navigation {
      position: absolute;
      left: -100%;
    }
  }
}

.left-panel-list {
  width: 100%;
  margin: 20px 0;
}

.left-panel-link {
  color: #000000;
  padding: 10px;
  font-size: 1em;
  display: flex;
  align-items: center;
  transition: color, background-color 0.2s;
  &:hover {
    color: #4ec5c1;
    background-color: #000000;
    opacity: 0.7;
  }
}

.left-panel-link-active {
  color: #4ec5c1;
  background-color: #000000;
}

.left-panel-icon {
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

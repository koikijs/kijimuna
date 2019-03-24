<template>
  <div class="login-popup-container" theme={theme}>
    <div class="login-popup-overlay" theme={theme} />
    <div class="login-popup-popup" theme={theme}>
      <div class="login-popup-line" >Welcome to Github Kijimuna Example!</div>
      <a href="/auth/github" class="login-popup-button" >
        <span class="login-popup-span">Login with</span>
        <i class="login-popup-fab fa-github" />
      </a>
    </div>
  </div class="login-popup-container">
</template>


<style>
.login-popup-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-popup-line {
  font-size: 24px;
  line-height: 2em;
}

.login-popup-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000000;
}

.login-popup-popup {
  background-color: #4ec5c1;
  width: 500px;
  height: 500px;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
}

.login-popup-span {
  margin-right: 10px;
}

.login-popup-button {
  color: #ffffff;
  background-color: #000000;
  font-size: 24px;
  font-weight: 100;
  padding: 10px 20px;
  border-radius: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

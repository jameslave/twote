<template>
  <div id="app"
    class="container">

    <div class="row d-flex justify-content-center align-items-center">
      <div class="logo">
        Twote
      </div>
    </div>

    <router-view></router-view>

    <router-link v-if="$route.path === '/'"
      to="/hof"
      tag="div"
      class="nav link d-flex align-items-center">
      <i class="fa fa-trophy fa-fw mr-2"></i> Hall of Fame
    </router-link>
    <router-link v-if="$route.path === '/hof'"
      to="/"
      tag="div"
      class="nav link d-flex align-items-center">
      <i class="fa fa-quote-left fa-fw mr-2"></i> New Quote
    </router-link>

  </div>
</template>

<script>
export default {
  mounted() {
    console.log(this.$route.path);
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Berkshire+Swash');

body {
  width: 100vw;
  background: linear-gradient(rgba(0, 0, 0, .3), rgba(0, 0, 0, .3)), url(./assets/bg.jpg) center center no-repeat;
  background-size: cover;
  background-attachment: fixed;
}

#app {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  color: #fff;
}

.logo {
  font-family: 'Berkshire Swash', cursive;
  font-size: 4rem;
}

.nav {
  font-family: 'Berkshire Swash', cursive;
  font-size: 1.5rem;
}

.container {
  min-height: 200px;
}

.link {
  cursor: pointer;
}

.fadeIn {
  animation-duration: 0.2s;
}

.fadeOut {
  animation-duration: 0.2s;
}
</style>

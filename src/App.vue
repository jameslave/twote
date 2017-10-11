<template>
  <div id="app">
    <div class="container">
      <div class="row d-flex justify-content-center align-items-center text-center">
        <div class="col-sm-12 col-md-8 col-lg-6">
          <router-link to="/"
            tag="div"
            class="logo link">
            Twote
          </router-link>
        </div>
      </div>
    </div>

    <div class="container">
      <transition mode="out-in"
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut">
        <router-view></router-view>
      </transition>
    </div>

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

#app {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(rgba(0, 0, 0, .3), rgba(0, 0, 0, .3)), url(./assets/bg.jpg) center center no-repeat;
  background-size: cover;
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

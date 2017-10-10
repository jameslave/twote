<template>
  <div id="app">
    <div class="container">
      <div class="row d-flex justify-content-center align-items-center text-center">
        <div class="col-sm-12 col-md-8 col-lg-6">
          <div class="logo">
            Twote
          </div>
        </div>
      </div>
    </div>

    <router-view></router-view>

    <div class="nav d-flex align-items-center">
      <i class="fa fa-trophy fa-fw mr-2"></i> Hall of Fame
    </div>
  </div>
</template>

<script>
export default {
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
</style>

<template>
  <div class="main-page absolute h-full w-full flex flex-col items-center">
    <div class="bg-overlay absolute w-full h-full bg-black opacity-30"></div>
    <img class="bg-img absolute w-full h-full" src="../src/assets/network-bg.jpg" alt="network image">
    <div class="navigation-bar m-4">
      <router-link to='/'> [Graph analyzer] </router-link>
      <router-link to='/clock'> [Clock] </router-link>
      <router-link to='/about'> [About] </router-link>
    </div>
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style>
.main-page {
  color: #D79922;
  font-weight: 400;
  /* background-image: url('../src/assets/network-bg.jpg'); */
  /* background-size: cover; */
  /* background-color: #4056a1; */
}

.bg-overlay {
  z-index: -1;
}

.bg-img {
  z-index: -2;
}

</style>

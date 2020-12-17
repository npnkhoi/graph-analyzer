<template>
  <div class="main-page absolute h-full w-full flex flex-col items-center">
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
  background-color: #4056a1;
}
</style>

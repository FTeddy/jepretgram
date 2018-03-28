<template id="">
  <div id="Navbar">
    <nav class="navbar is-transparent is-dark">
      <div class="navbar-brand">
        <a class="navbar-item" href="/">
          <h1 class="title has-text-white">JepretGram</h1>
        </a>
        <div class="navbar-burger burger" data-target="mainNavigation">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div id="mainNavigation" class="navbar-menu">
        <div class="navbar-start">
          <router-link to="/" class="navbar-item">
            Home
          </router-link>
          <router-link to="/recent/list" class="navbar-item">
            Recent
          </router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'Navbar'
}
</script>

<style media="screen">

</style>

<template lang="html">
  <div id="Home">
    <section class="hero is-fullheight is-bold is-light">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title">HOME</h1>
          <p class="subtitle">Please Login</p>
          <div id="fb-root"></div>
          <div class="is-loading" id="spinner">
            <a class="button is-loading" style="background:none; border:none;">Loading</a>
          </div>
          <div class="fb-login-button" data-scope="public_profile, email" onlogin="checkLoginState();" data-max-rows="1" data-size="large" data-button-type="continue_with" data-show-faces="false" data-auto-logout-link="false" data-use-continue-as="false"></div>
          <button type="button" name="button" class="fb-logout-button logout-style" onclick="logout()">
            logout
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'Home',
  computed: {
    ...mapState([
      'jwt', 'userId'
    ])
  },
  methods: {
  }
}
</script>

<style lang="css">
.main-body {
  margin: 0;
  padding: 0;
}
.element {
    &.is-loading-b {
        position: relative;
        pointer-events: none;
        opacity: 0.5;
        &:after {
            @include loader;
            position: absolute;
            top: calc(50% - 2.5em);
            left: calc(50% - 2.5em);
            width: 5em;
            height: 5em;
            border-width: 0.25em;
        }
    }
}
#spinner {
  background: #4267b2;
  border-radius: 5px;
  color: white;
  height: 40px;
  text-align: center;
  width: 250px;
  display: inline-block;
}
.logout-style {
  background: #4267b2;
  border-radius: 5px;
  color: white;
  height: 40px;
  text-align: center;
  width: 250px;
  display: none;
}
.block {
  display: block;
}
.inline {
  display: inline-block;
}
.border-none {
  border:none;
}
</style>

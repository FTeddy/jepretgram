<template lang="html">
  <div id="Article">
    <section class="hero is-fullheight is-bold is-light">
      <div class="hero-head">
        <div class="p-custom">

          <div class="level">
            <div class="level-left">
              <div class="level-item">
                <div class="content">
                  <h1>JepretGram</h1>
                </div>
              </div>
            </div>
            <div class="level-right">
              <div class="level-item">
                <div>
                  <a v-on:click="activateModal" class="is-primary is-large button">POST</a>
                </div>
              </div>
            </div>
          </div>

          <router-view></router-view>

        </div>
      </div>
    </section>

    <div :class="postModalClass">
      <div class="modal-background" v-on:click="deactivateModal"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Jepret!</p>
          <button class="delete" aria-label="close" v-on:click="deactivateModal"></button>
        </header>
        <section class="modal-card-body">
          <!-- Content ... -->
          <PostForm></PostForm>
        </section>
        <footer class="modal-card-foot">
          <button class="button" v-on:click="deactivateModal">Cancel</button>
        </footer>
      </div>
    </div>

  </div>
</template>

<script>
import PostForm from '@/components/PostForm'
import { mapState } from 'vuex'
export default {
  name: 'Recent',
  components: {
    PostForm
  },
  data: () => {
    return {
      postModalClass: 'modal'
    }
  },
  computed: {
    ...mapState([
      'jwtToken', 'userId'
    ])
  },
  methods: {
    activateModal (action) {
      this.postModalClass = 'modal is-active'
    },
    deactivateModal () {
      this.postModalClass = 'modal'
    }
  }
}
</script>

<style lang="css">
.p-custom {
  padding: 3.6em 3.7em;
}
.full-height {
  min-height: 80vh;
}
#post-button {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

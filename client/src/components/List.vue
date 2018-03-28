<template lang="html">
  <div class="tile is-ancestor">
    <div v-for="(pic, index) in recents" :key="index" class="tile is-4 is-parent">
      <article class="tile is-child notification is-light">
        <img class="image is-fluid" :src="pic.imgUrl" alt="">
        <div class="content">
          <p class="is-capitalized">{{pic.caption}}</p>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
export default {
  name: 'List',
  data () {
    return {
      recents: []
    }
  },
  created () {
    this.getRecent()
  },
  methods: {
    getRecent () {
      let self = this
      this.$baseAxios.get('pics/')
        .then(serverRes => {
          console.log(serverRes.data.message)
          self.recents = serverRes.data.pics
        })
    }
  }
}
</script>

<style lang="css">
</style>

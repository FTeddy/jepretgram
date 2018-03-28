<template lang="html">
  <div class="tile is-ancestor">
    <div v-for="(pic, index) in recents" :key="index" class="tile is-4 is-parent">
      <article class="tile is-child notification is-light">
        <img class="image is-fluid" :src="pic.imgUrl" alt="">
        <div class="content">
          <p class="is-capitalized">{{pic.caption}}</p>
          <p>{{pic.userId.name}}</p>
          <p v-if="votes[index]">votes {{votes[index].length}}</p>
          <button class="button" name="button" v-on:click="voteUp(pic, index)"><3</button>
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
      recents: [],
      votes: []
    }
  },
  created () {
    this.votes = []
    this.getRecent()
  },
  methods: {
    getRecent () {
      let self = this
      this.$baseAxios.get('pics/')
        .then(serverRes => {
          console.log(serverRes.data.message)
          let images = serverRes.data.pics
          self.recents = images
          images.forEach(pic => {
            self.getVote(pic)
          })
        })
    },
    getVote (pic) {
      let self = this
      this.$baseAxios.get(`/vote/${pic._id}`)
        .then(serverRes => {
          console.log(serverRes.data.votes.length)
          let voteDatas = serverRes.data.votes
          let array = []
          voteDatas.forEach(vote => {
            array.push(vote)
          })
          self.votes.push(array)
        })
    },
    voteUp (pic) {
      if (pic.userId._id !== localStorage.getItem('userID')) {
        this.$baseAxios.post(`vote/up/${pic._id}/${localStorage.getItem('userID')}`, {}, {headers: {token: localStorage.getItem('jwtToken')}})
          .then(serverRes => {
            console.log(serverRes)
          })
      }
    }
  }
}
</script>

<style lang="css">
</style>

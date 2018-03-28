<template lang="html">
  <section class="hero is-bold is-light" id="Post">
    <div class="hero-body">
      <div class=" ">

        <!-- send form data through vue -->
        <div class="field">
          <label class="label">Caption</label>
          <div class="control has-icons-left">
            <input v-model="caption" class="input" type="text" placeholder="Caption me!">
            <span class="icon is-small is-left">
              <i class="fas fa-tasks"></i>
            </span>
          </div>
        </div>

        <div class="level">
          <div class="level-left">
            <div class="level-item">

              <div class="field">
                <div class="file">
                  <label class="file-label">
                    <input v-on:change="onFileChange" class="file-input" type="file" name="image" accept="image/*">
                    <span class="file-cta">
                      <span class="file-icon">
                        <i class="fas fa-upload"></i>
                      </span>
                      <span class="file-label">
                        Choose a file…
                      </span>
                    </span>
                  </label>
                </div>
              </div>

            </div>
          </div>

          <div class="level-right">
            <div class="level-item">
              <div class="field is-grouped">
                <div class="control">
                  <button class="button is-link" v-on:click="confirmData">Submit</button>
                </div>
              </div>
            </div>

            </div>
          </div>
        </div>

    </div>
  </section>
</template>

<script>
export default {
  name: 'PostForm',
  data () {
    return {
      caption: '',
      file: ''
    }
  },
  methods: {
    confirmData () {
      let form = new FormData()
      form.append('caption', this.caption)
      form.append('image', this.file)
      this.$baseAxios.post(`pics/post/${localStorage.getItem('userID')}`, form, {headers: {token: localStorage.getItem('jwtToken')}}).then(serverRes => {
        console.log(serverRes.data.message)
        let pic = serverRes.data.pic
        console.log(pic)
        // this.$router.push({ path: `/recent/${pic._id}` })
        // this.$store.dispatch('postRedirectAct', {status: true})
      }).catch(err => { console.log(err) })
    },
    onFileChange (e) {
      let files = e.target.files || e.dataTransfer.files
      if (!files.length) {
        return
      }
      this.file = files[0]
    }
  }
}
</script>

<style lang="css">
</style>

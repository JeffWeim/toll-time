<template lang="html">

  <section class="signup">
    <form>
      <label>Username:</label>
      <input type="text" name="username" v-model="username"/>

      <br/>

      <label>Password:</label>
      <input type="password" name="password" v-model="password"/>

      <br/>

      <label>First Name:</label>
      <input type="text" name="firstname" v-model="firstname"/>

      <br/>

      <label>Last Name:</label>
      <input type="text" name="lastname" v-model="lastname"/>

      <br/>

      <label>Email:</label>
      <input type="email" name="email" v-model="email"/>

      <br/>

      <label>Signup for Emails:</label>
      <input type="checkbox" name="register" v-model="register"/>

      <br/>

      <label>Upload Image for Avatar</label>
      <input type="file" name="avatar" @change="fileUploaded"/>

      <br/>

      <img style="max-width: 50px; border-radius: 50%;" :src="this.avatar" />

      <br/>

      <button :disabled="disabled" @click.prevent="signup">Signup</button>

      <br/>

      <p class="signup__error-message" v-if="error.length">{{ error }}</p>
    </form>
  </section>

</template>

<script lang="js">
  import { signup } from '@/api/auth'

  export default  {
    name: 'Signup',
    data() {
      return {
        username: '',
        password: '',
        email: '',
        firstname: '',
        lastname: '',
        register: false,
        error: '',
        avatar: '',
        disabled: false
      }
    },
    methods: {
      fileUploaded (e) {
        let files = e.target.files || e.dataTransfer.files
        if (!files.length) return
          this.createImage(files[0])
      },
      createImage(file) {
        let image = new Image()
        let reader = new FileReader()
        let vm = this

        reader.onload = e => {
          vm.avatar = e.target.result
        }

        reader.readAsDataURL(file)
      },
      signup () {
        let data = {
          username: this.username,
          password: this.password,
          firstname: this.firstname,
          lastname: this.lastname,
          email: this.email,
          register: this.register,
          avatar: this.avatar
        }

        signup(this, data, '/')
      }
    }
}
</script>

<style scoped lang="scss">
  .signup {

    &__error-message {
      color: red;
    }
  }
</style>

<template>
  <div class="container">
    <div class="signincontainer">
      <h3>
        <span>請</span>
        <span>先</span>
        <span>登</span>
        <span>入</span>
        <span>!</span>
      </h3>
      <label for="accsignin">帳號</label>
      <input
        type="email"
        id="accsignin"
        class="signinaccount"
        placeholder="請輸入mail"
        v-model="user.username"
      />
      <label for="passsignin">密碼</label>
      <input
        type="password"
        id="passsignin"
        class="signinpassword"
        placeholder="請輸入密碼"
        v-model="user.password"
      />
      <button type="button" value="登入" class="signin" @click="signIn">
        登入
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      user: {}
    }
  },
  methods: {
    signIn () {
      this.$http.post(`${process.env.VUE_APP_API}/admin/signin`, this.user)
        .then(res => {
          const { token, expired } = res.data
          document.cookie = `meToken=${token};expires=${new Date(expired)};`
          this.$router.push('/admin')
        })
        .catch(err => {
          alert(err.data.message)
        })
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  max-width: 100vw;
  height: 100vh;
  margin: 0 auto;
  background: #34495e;
  display: flex;
  padding: 40px 0;
}
.signincontainer {
  width: 400px;
  margin: auto;
  background: #191919;
  text-align: center;
  padding: 30px 0;
  box-shadow: 15px 15px 15px black;
}
h2,
h3 {
  color: #333;
  font-size: 40px;
  margin: 20px 0;
}
h2 span {
  animation: animate 2s linear infinite;
}
@keyframes animate {
  0%,
  80% {
    color: #333;
  }
  100% {
    color: #fff;
  }
}
h3 span {
  animation: animate2 4s linear infinite;
}
@keyframes animate2 {
  0%,
  80% {
    color: #333;
  }
  100% {
    color: #fff;
  }
}
h2 span:nth-child(1) {
  animation-delay: 0s;
}
h2 span:nth-child(2) {
  animation-delay: 0.4s;
}
h2 span:nth-child(3) {
  animation-delay: 0.8s;
}
h2 span:nth-child(4) {
  animation-delay: 1.2s;
}
h2 span:nth-child(5) {
  animation-delay: 1.6s;
}
h3 span:nth-child(1) {
  animation-delay: 0s;
}
h3 span:nth-child(2) {
  animation-delay: 0.8s;
}
h3 span:nth-child(3) {
  animation-delay: 1.6s;
}
h3 span:nth-child(4) {
  animation-delay: 2.4s;
}
h3 span:nth-child(5) {
  animation-delay: 3.2s;
}
label {
  color: white;
}
.signinaccount,
.signinpassword {
  background: none;
  border: 2px solid #3498db;
  border-radius: 30px;
  display: block;
  margin: 20px auto;
  text-align: center;
  padding: 15px 10px;
  width: 200px;
  outline: none;
  color: white;
  transition: 0.5s;
}
.signinaccount:focus,
.signinpassword:focus,
.signinaccount:hover,
.signinpassword:hover {
  width: 280px;
  border-color: #2ecc71;
}
.signin {
  background: none;
  border: 2px solid #3498db;
  border-radius: 30px;
  display: block;
  margin: 10px auto;
  text-align: center;
  padding: 15px 10px;
  width: 80px;
  color: white;
  transition: 0.5s;
}
.signin:hover {
  background: #2ecc71;
}
</style>

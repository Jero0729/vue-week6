<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand">Logo</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/admin" class="nav-link">後台首頁</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/admin/products" class="nav-link">後台產品列表</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/admin/coupon" class="nav-link">優惠券</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/" class="nav-link" @click='signout'>登出</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <router-view />
</template>

<script>
export default {
  data () {
    return {
      checkSuccess: false
    }
  },
  methods: {
    checkLogin () {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)meToken\s*=\s*([^;]*).*$)|^.*$/,
        '$1'
      )
      if (token) {
        this.$http.defaults.headers.common.Authorization = `${token}`
        const api = `${process.env.VUE_APP_API}api/user/check`
        this.$http
          .post(api, { api_token: this.token })
          .then(() => {
            this.checkSuccess = true
          })
          .catch(err => {
            alert(err.data.message)
            this.$router.push('/login')
          })
      } else {
        alert('請登入!')
        this.$router.push('/login')
      }
    },
    signout () {
      document.cookie = 'meToken = ; expires = ;'
      alert('token 已清除 881')
      this.$router.push('/login')
    }
  },
  mounted () {
    this.checkLogin()
  }
}
</script>

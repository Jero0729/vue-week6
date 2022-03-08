<template>
  <VLoading :active="isLoading"></VLoading>
  <div class="container">
  <h2>購物車</h2>
    <div class="mt-3">
      <div class="text-end">
        <button
          class="btn btn-outline-danger"
          type="button"
          @click="deleteAllCarts"
          :disabled="cart.carts?.length === 0"
        >
          清空購物車
        </button>
      </div>
      <table class="table align-middle table-hover">
        <thead>
          <tr>
            <th></th>
            <th>品名</th>
            <th style="width: 150px">數量/單位</th>
            <th class="text-end">單價</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="cart?.carts?.length!==0">
            <tr v-for="product in cart.carts" :key="product.id">
              <td>
                <button
                  type="button"
                  class="btn btn-outline-danger btn-sm"
                  :disabled="loadingStatus.loadingItem === product.id"
                  @click="deleteOneCart(product.id)"
                >
                  <i
                    class="fas fa-spinner fa-pulse"
                    v-if="loadingStatus.loadingItem === product.id"
                  ></i>
                  刪除
                </button>
              </td>
              <td>
                {{ product.product.title }}
                <div class="text-success" v-if="product.coupon">
                  已套用優惠券
                </div>
              </td>
              <td>
                <div class="input-group input-group-sm">
                  <div class="input-group mb-3">
                    <input
                      min="1"
                      type="number"
                      class="form-control"
                      v-model.number="product.qty"
                      @blur="update(product)"
                      :disabled="loadingStatus.loadingItem === product.id"
                    />
                    <span class="input-group-text" id="basic-addon2"
                      >{{ product.product.unit }}</span
                    >
                  </div>
                </div>
              </td>
              <td class="text-end">
                <small
                  class="text-success"
                  v-if="cart.final_total !== cart.total"
                  >折扣價：</small
                >
                {{ product.final_total }}
              </td>
            </tr>
          </template>
          <template v-else>
            <tr>
              <td class="text-center" colspan="4">
              目前尚未有品項
              </td>
            </tr>
          </template>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3" class="text-end">總計</td>
            <td class="text-end">{{ cart.total }}</td>
          </tr>
          <tr v-if="cart.final_total !== cart.total">
            <td colspan="3" class="text-end text-success">折扣價</td>
            <td class="text-end text-success">{{ cart.final_total }}</td>
          </tr>
        </tfoot>
      </table>
    </div>
    <!-- 表單 -->
    <div class="my-5 row justify-content-center">
      <VForm
        ref="form"
        class="col-md-6"
        v-slot="{ errors }"
        @submit="createOrder"
      >
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <VField
            id="email"
            name="email"
            type="email"
            class="form-control"
            :class="{ 'is-invalid': errors['email'] }"
            rules="email|required"
            v-model="form.user.email"
            placeholder="請輸入 Email"
          ></VField>
          <error-message
            name="email"
            class="invalid-feedback"
          ></error-message>
        </div>

        <div class="mb-3">
          <label for="name" class="form-label">收件人姓名</label>
          <VField
            id="name"
            name="姓名"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors['姓名'] }"
            placeholder="請輸入姓名"
            rules="required"
            v-model="form.user.name"
          ></VField>
          <error-message
            name="姓名"
            class="invalid-feedback"
          ></error-message>
        </div>

        <div class="mb-3">
          <label for="tel" class="form-label">收件人行動電話</label>
          <VField
            id="tel"
            name="行動電話"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors['行動電話'] }"
            :rules="isPhone"
            v-model="form.user.tel"
            placeholder="請輸入行動電話"
          ></VField>
          <error-message
            name="行動電話"
            class="invalid-feedback"
          ></error-message>
        </div>

        <div class="mb-3">
          <label for="address" class="form-label">收件人地址</label>
          <VField
            id="address"
            name="地址"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors['地址'] }"
            placeholder="請輸入地址"
            rules="required"
            v-model="form.user.address"
          ></VField>
          <error-message
            name="地址"
            class="invalid-feedback"
          ></error-message>
        </div>

        <div class="mb-3">
          <label for="message" class="form-label">留言</label>
          <textarea
            id="message"
            class="form-control"
            cols="30"
            rows="10"
            v-model="form.message"
          ></textarea>
        </div>
        <div class="text-end">

          <button
            type="submit"
            class="btn btn-danger"
            :disabled="Object.keys(errors).length > 0 || cart.carts?.length === 0"
            @click="loading"
          >
            送出訂單
          </button>
        </div>
      </VForm>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loadingStatus: {
        loadingItem: ''
      },
      isLoading: false,
      cart: {},
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      },
      coupon_code: ''
    }
  },
  methods: {
    getCart () {
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`).then(res => {
        this.cart = res.data.data
      }).catch(err => {
        alert(err.data.message)
      })
    },
    deleteAllCarts () {
      this.$http.delete(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/carts`).then((res) => {
        alert(res.data.message)
        this.getCart()
      }).catch((err) => {
        alert(err.data.message)
      })
    },
    deleteOneCart (id) {
      this.loadingStatus.loadingItem = id
      this.$http.delete(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${id}`).then(res => {
        alert(res.data.message)
        this.loadingStatus.loadingItem = ''
        this.getCart()
      }).catch(err => {
        alert(err.data.message)
      })
    },
    update (data) {
      this.loadingStatus.loadingItem = data.id
      const cart = {
        product_id: data.product_id,
        qty: data.qty
      }
      this.$http.put(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${data.id}`, { data: cart }).then(res => {
        alert(res.data.message)
        this.loadingStatus.loadingItem = ''
        this.getCart()
      }).catch(err => {
        alert(err.data.message)
        this.loadingStatus.loadingItem = ''
      })
    },
    createOrder () {
      const order = this.form
      this.$http.post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order`, { data: order }).then(res => {
        alert(res.data.message)
        this.$refs.form.resetForm()
        this.form.message = ''
        this.getCart()
      }).catch(err => {
        alert(err.data.message)
      })
    },
    isPhone (value) {
      const phoneNumber = /^(09)[0-9]{8}$/
      return phoneNumber.test(value) ? true : '需要正確的行動電話'
    },
    loading () {
      this.isLoading = true
      setTimeout(() => {
        this.isLoading = false
      }, 1000)
    }
  },
  watch: {
    'cart.carts': {
      handler (n) {
        n.forEach(item => {
          if (item.qty < 0 || item.qty === 0) {
            alert('數量不能低於1')
            item.qty = 1
          }
        })
      },
      deep: true
    }
  },
  mounted () {
    this.getCart()
    this.loading()
  }
}
</script>

<style scoped>
.container {
  padding-top: 80px
}
</style>

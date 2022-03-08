<template>
  <VLoading :active="isLoading"></VLoading>
  <div class="container">
  <h2>產品列表</h2>
    <ProductModal
    ref="userProductModal"
    :product="product"
    @add-to-cart="addToCart"
    ></ProductModal>
    <table class="table align-middle">
      <thead>
        <tr>
          <th>圖片</th>
          <th>商品名稱</th>
          <th>價格</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td style="width: 200px">
            <div
              :style="{backgroundImage :`url(${product.imageUrl})`}"
              style="
                height: 100px;
                background-size: cover;
                background-position: center;
              "
            ></div>
          </td>
          <td>{{ product.title }}</td>
          <td>
            <div class="h5" v-if="product.price === product.origin_price">
              {{ product.price}} 元
            </div>
            <div v-else>
              <del class="h6">原價 {{ product.origin_price }} 元</del>
              <div class="h5">現在只要 {{ product.price }} 元</div>
            </div>
          </td>
          <td>
            <div class="btn-group btn-group-sm">
              <button
                type="button"
                class="btn btn-outline-secondary"
                @click="getProduct(product.id)"
                :disabled="loadingStatus.loadingItem === product.id"
              >
                <i
                  class="fas fa-spinner fa-pulse"
                  v-show="loadingStatus.loadingItem === product.id"
                ></i>
                查看更多
              </button>
              <button
                type="button"
                class="btn btn-outline-danger"
                @click="addToCart(product.id)"
                :disabled="loadingStatus.loadingItem === product.id"
              >
                <i
                  class="fas fa-spinner fa-pulse"
                  v-show="loadingStatus.loadingItem === product.id"
                ></i>
                加到購物車
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

</template>

<script>
import ProductModal from '@/components/ProductModal.vue'

export default {
  data () {
    return {
      loadingStatus: {
        loadingItem: ''
      },
      isLoading: false,
      products: [],
      product: {},
      cart: {}
    }
  },
  methods: {
    getProducts () {
      this.$http(`${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`)
        .then(res => {
          this.products = res.data.products
        }
        ).catch(err => {
          console.log(err)
        })
    },
    getProduct (id) {
      this.loadingStatus.loadingItem = id
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${id}`)
        .then(res => {
          this.loadingStatus.loadingItem = ''
          this.product = res.data.product
          this.$refs.userProductModal.openModal()
        })
        .catch(err => {
          alert(err.data.message)
        })
    },
    addToCart (id, qty = 1) {
      this.loadingStatus.loadingItem = id
      const cart = {
        product_id: id,
        qty
      }
      this.$http.post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`, { data: cart })
        .then(res => {
          alert(res.data.message)
          this.loadingStatus.loadingItem = ''
          this.$refs.userProductModal.hideModal()
        }).catch(err => {
          alert(err.data.message)
        })
    },
    loading () {
      this.isLoading = true
      setTimeout(() => {
        this.isLoading = false
      }, 1000)
    }
  },
  components: {
    ProductModal
  },
  mounted () {
    this.getProducts()
    this.loading()
  }
}
</script>

<style scoped>
.container {
  padding-top: 80px
}
</style>

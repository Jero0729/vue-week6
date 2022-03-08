<template>
  <VLoading :active="isLoading"></VLoading>
  <div class="container">
    <table class="table table-hover mt-4">
      <thead>
        <tr>
          <th width="150">產品分類</th>
          <th width="150">產品名稱</th>
          <th width="120">原價</th>
          <th width="120">售價</th>
          <th width="150">是否啟用</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.category }}</td>
          <td>{{ product.title }}</td>
          <td>{{ (product.origin_price).toLocaleString() }}</td>
          <td>{{ (product.price).toLocaleString() }}</td>
          <td>
            <div class="form-check form-switch">
              <input v-model="product.is_enabled" class="form-check-input" type="checkbox" :id="product.id" :true-value=1 :false-value=0 >
              <label v-if="product.is_enabled" class="form-check-label d-none d-sm-block " :for="product.id">啟用</label>
              <label v-else class="form-check-label d-none d-sm-block " :for="product.id">未啟用</label>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination :pages='pagination' @get-data='getData'></Pagination>
  </div>
</template>

<script>
import Pagination from '@/components/PaginationComponent.vue'

export default {
  data () {
    return {
      products: [],
      pagination: {},
      tempProduct: {
        imagesUrl: []
      },
      isNew: false,
      isLoading: false
    }
  },
  methods: {
    getData (page = 1) {
      if (page === 'now') {
        page = this.pagination.current_page
      }
      this.$http.get(`${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products?page=${page}`)
        .then(res => {
          this.products = res.data.products
          this.pagination = res.data.pagination
        })
        .catch(err => {
          console.log(err.data.message)
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
    Pagination
  },
  // props: ['token'],
  mounted () {
    this.getData()
    this.loading()
  }
}
</script>

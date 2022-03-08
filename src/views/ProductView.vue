<template>
  <h2>單一產品</h2>
  {{product}}
  <img :src="product.imageUrl" alt="">
</template>

<script>
export default {
  data () {
    return {
      product: []
    }
  },
  methods: {
    getProduct () {
      const { id } = this.$route.params
      this.$http(`${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${id}`)
        .then(res => {
          this.product = res.data.product
        }
        ).catch(err => {
          console.log(err)
        })
    }
  },
  mounted () {
    this.getProduct()
  }
}
</script>

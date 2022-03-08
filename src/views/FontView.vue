<template>
  <FontNavbar></FontNavbar>
  <router-view/>
</template>

<script>
import FontNavbar from '@/components/FontNavbar.vue'

export default {
  components: {
    FontNavbar
  }
}
</script>

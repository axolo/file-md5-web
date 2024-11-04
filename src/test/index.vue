<script>
import md5file from '../lib'

export default {
  data() {
    return {
      loading: false,
      md5: ''
    }
  },
  methods: {
    async change(e) {
      const file = e.target.files[0]
      this.loading = true
      this.md5 = await md5file(file, {
        onProgress: console.log
      })
      this.loading = false
    }
  }
}
</script>

<template>
  <div class="test-index">
    <h3>@axolo/file-md5-web</h3>
    <input type="file" @change="change">
    <div v-if="loading">hashing...</div>
    <div v-else>{{ md5 }}</div>
  </div>
</template>

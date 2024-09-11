<template>
  <div>
    <div class="container">
      <v-textarea v-model="prompt" :auto-grow="true" variant="outlined" placeholder="이미지를 설명해주세요"></v-textarea>
      <div class="text-center">
        <v-btn color="primary" variant="outlined" @click="submit">
          그리기
        </v-btn>
      </div>

      <div class="image-container">
        <img v-if="imageUrl" :src="imageUrl" alt="image" style="width: 100%">

      </div>
    </div>



  </div>
</template>

<script>

import { defineComponent } from 'vue';
export default defineComponent({
  data() {
    return {
      prompt: '',
      imageUrl: null
    }
  },
  methods: {
    async submit() {
      let result = await this.$axios.post("/api/image/generate", {
        prompt: this.prompt
      })
      if (result.data.result == 'success') {
        this.imageUrl = result.data.imageUrl
      }

      console.log(result)
    }
  }

});
</script>
<style>
.container {
  padding: 20px;
  width: 600px;
  margin: 0 auto;
}
</style>
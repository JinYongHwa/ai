<template>
    <div class="image-upload-container">
      <div class="image-box" @click="triggerFileInput">
        <template v-if="imageUrl">
          <img :src="imageUrl" alt="Uploaded Image" class="uploaded-image" />
        </template>
        <template v-else>
          <div class="plus-icon">+</div>
        </template>
      </div>
      <input type="file" ref="fileInput" @change="handleFileUpload" accept="image/*" style="display: none" />
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        imageUrl: null,
      };
    },
    methods: {
      triggerFileInput() {
        this.$refs.fileInput.click();
      },
      handleFileUpload(event) {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.imageUrl = e.target.result;
            // 이미지가 업로드될 때 changeImage 이벤트를 트리거합니다.
            this.$emit('changeImage', file);
          };
          reader.readAsDataURL(file);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .image-upload-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  
  .image-box {
    width: 150px;
    height: 150px;
    border: 2px dashed #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    position: relative;
  }
  
  .plus-icon {
    font-size: 2rem;
    color: #ccc;
  }
  
  .uploaded-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .image-box:hover {
    border-color: #aaa;
  }
  </style>
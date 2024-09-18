<template>
    <div>
        <image-upload @changeImage="onImageChange"></image-upload>
        <div class="food" v-if="food">
            <div class="food-name">{{ food.food_name }}</div>
            <div class="calories">{{ food.food_total_calories }}kcal</div>
        </div>

    </div>
</template>

<script>
import ImageUpload from '@/components/ImageUpload.vue'

export default {
    components: {
        ImageUpload
    },
    data() {
        return {
            food: null
        }
    },
    methods: {
        async onImageChange(file) {
            console.log(file)
            let result = await this.$axios.post('/api/vision', {
                file: file
            }, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            if (result.data.result == 'success') {
                console.log(result.data)
                this.food = result.data.food
            }
        }
    }
}
</script>

<style scoped lang="less">
.food {
    text-align: center;

    .food-name {
        margin-top: 10px;
        font-size: 40px;
        font-weight: bold;
    }

    .calories {
        margin-top: 10px;
        font-size: 30px;
        font-weight: 700;
    }
}
</style>
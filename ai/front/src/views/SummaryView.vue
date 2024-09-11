<template>
    <div>

        <div class="container">
            <v-text-field v-model="url" placeholder="요약할 URL" variant="outlined"></v-text-field>

            <div class="text-center">
                <v-btn color="primary" variant="outlined" @click="submit">
                    요약하기
                </v-btn>
            </div>

            <div class="result" v-html="mark"></div>
        </div>



    </div>
</template>
  
<script>
import { marked } from "marked";
import { defineComponent } from 'vue';
export default defineComponent({
    data() {
        return {
            url: '',
            result: null
        }
    },
    computed: {
        mark() {
            if (this.result) {
                var content = this.result
                return (marked.parse(content)).replace(/\n/g, "<br>");
            }


        },
    },
    methods: {
        async submit() {
            let result = await this.$axios.post("/api/url/summary", {
                url: this.url
            })
            if (result.data.result == 'success') {
                this.result = result.data.summary
                //     this.imageUrl = result.data.imageUrl
            }

            // console.log(result)
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
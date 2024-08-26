<script setup>
import { onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { usePostStore } from "@/stores/usePostStore";
import { useAuthStore } from "@/stores/useAuthStore";

const formData = reactive({
    title: "",
    body: "",
});

const route = useRoute();
const router = useRouter();
const postStore = usePostStore();
const post = ref(null);

const authStore = useAuthStore()
onMounted(async () => {
    post.value = await postStore.show(route.params.id)
    if (authStore.user.id !== post.value.user_id) {
        router.push({ name: 'home' })
    }
    formData.title = post.value.title
    formData.body = post.value.body
})
</script>

<template>
    <main>
        <h1 class="title">Update your post</h1>
        <form @submit.prevent="postStore.update(post, formData)" class="w-1/2 mx-auto space-y-6">
            <div>
                <input type="text" placeholder="Post title" v-model="formData.title">
                <p v-if="postStore.errors.title" class="error">{{ postStore.errors.title[0] }}</p>
            </div>
            <div>
                <textarea rows="6" placeholder="Post content" v-model="formData.body"></textarea>
                <p v-if="postStore.errors.body" class="error">{{ postStore.errors.body[0] }}</p>
            </div>
            <button class="primary-btn">
                Update
            </button>
        </form>
    </main>
</template>
<script setup>
import { reactive } from "vue";
import { usePostStore } from "@/stores/usePostStore";
const formData = reactive({
    title: "",
    body: "",
});

const postStore = usePostStore();
</script>

<template>
    <main>
        <h1 class="title">Create New Post</h1>
        <form @submit.prevent="postStore.store(formData)" class="w-1/2 mx-auto space-y-6">
            <div>
                <input type="text" placeholder="Post title" v-model="formData.title">
                <p v-if="postStore.errors.title" class="error">{{ postStore.errors.title[0] }}</p>
            </div>
            <div>
                <textarea rows="6" placeholder="Post content" v-model="formData.body"></textarea>
                <p v-if="postStore.errors.body" class="error">{{ postStore.errors.body[0] }}</p>
            </div>
            <button class="primary-btn">
                Create Post
            </button>
        </form>
    </main>
</template>
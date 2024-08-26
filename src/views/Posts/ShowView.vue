<script setup>
import { usePostStore } from '@/stores/usePostStore';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/useAuthStore';
const authStore = useAuthStore()
const postStore = usePostStore()
const route = useRoute()
const post = ref(null)
const isLoading = ref(true)
onMounted(async () => {
    try {
        post.value = await postStore.show(route.params.id)
    } finally {
        isLoading.value = false
    }
});
</script>

<template>
    <main>
        <div v-if="isLoading">
            <p class="text-center mt-12">Loading post...</p>
        </div>
        <div v-else-if="post">
            <div class="border-l-4 border-blue-500 pl-4 mt-12">
                <h2 class="font-bold text-3xl">{{ post.title }}</h2>
                <p class="text-xs text-slate-600 mb-4">Posted by {{ post.user.name }}</p>
                <p>{{ post.body }}</p>
                <div v-if="authStore.user && authStore.user.id === post.user_id" class="flex items-center gap-6 mt-6">
                    <form @submit.prevent="postStore.destroy(post)">
                        <button class="text-red-500 font-bold px-2 py-1 border border-red-300">Delete</button>
                    </form>
                    <RouterLink :to="{ name: 'edit', params: { id: post.id } }">
                        <button class="text-green-500 font-bold px-2 py-1 border border-green-300">Update</button>
                    </RouterLink>

                </div>
            </div>
        </div>
        <div v-else>
            <h2 class="title">Post does not exist</h2>
        </div>
    </main>
</template>
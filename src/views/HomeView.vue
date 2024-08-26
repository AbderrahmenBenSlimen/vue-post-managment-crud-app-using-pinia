<script setup>
import { usePostStore } from "@/stores/usePostStore";
import { RouterLink } from 'vue-router';
import { ref, onMounted } from "vue";
const postStore = usePostStore();
const posts = ref([]);
const isLoading = ref(true);
onMounted(async () => {
  try {
    posts.value = await postStore.index()
  } finally {
    isLoading.value = false
  }
});

</script>

<template>
  <main>
    <h1 class="title">Latest Post</h1>
    <div v-if="isLoading">
      <p class="text-center">Loading posts...</p>
    </div>
    <div v-else-if="posts.length > 0">
      <div v-for="post in posts" :key="post.id" class="border-l-4 border-blue-500 pl-4 mb-12">
        <h2 class="font-bold text-3xl">{{ post.title }}</h2>
        <p class="text-xs text-slate-600 mb-4">Posted by {{ post.user.name }}</p>
        <p>{{ post.body }}</p>
        <RouterLink :to="{ name: 'show', params: { id: post.id } }" class="text-blue-500 font-semibold underline">Read
          more...</RouterLink>
      </div>
    </div>
    <div v-else>
      <h2 class="title">There are no posts yet</h2>
    </div>
  </main>
</template>

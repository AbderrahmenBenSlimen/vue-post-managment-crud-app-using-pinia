<script setup>
import { RouterLink, RouterView } from 'vue-router';
import { useAuthStore } from "@/stores/useAuthStore";
import { onMounted } from 'vue';

const authStore = useAuthStore();

</script>

<template>
  <header>

    <nav>
      <RouterLink :to="{ name: 'home' }" class="nav-link">Home</RouterLink>
      <div v-if="authStore.user" class="flex items-center space-x-6 text-white">
        <p>Welcome back {{ authStore.user.name }}</p>
        <RouterLink :to="{ name: 'create' }" class="nav-link">Create</RouterLink>
        <form @submit.prevent="authStore.logout">
          <button class="nav-link">Log out</button>
        </form>
      </div>
      <div v-else class="space-x-6">
        <RouterLink :to="{ name: 'register' }" class="nav-link">Register</RouterLink>
        <RouterLink :to="{ name: 'login' }" class="nav-link">Login</RouterLink>
      </div>

    </nav>

  </header>

  <RouterView />
</template>

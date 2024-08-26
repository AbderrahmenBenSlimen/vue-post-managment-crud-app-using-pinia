<script setup>
import { reactive, onMounted } from "vue";
import { useAuthStore } from "@/stores/useAuthStore";
import { storeToRefs } from "pinia";
const authStore = useAuthStore();

const formData = reactive({
    email: "",
    password: "",
});
onMounted(() => {
    authStore.errors = {};
})
</script>

<template>
    <main>
        <h1 class="title">Login to your account</h1>
        <form @submit.prevent="authStore.authenticate('login', formData)" action="" class="w-1/2 mx-auto space-y-6">
            <div>
                Email:
                <input type="email" v-model="formData.email">
                <p v-if="authStore.errors.email" class="error">{{ authStore.errors.email[0] }}</p>
            </div>
            <div>
                Password:
                <input type="password" v-model="formData.password">
                <p v-if="authStore.errors.password" class="error">{{ authStore.errors.password[0] }}</p>

            </div>


            <div>
                <button class="primary-btn">Login</button>
            </div>
        </form>
    </main>
</template>

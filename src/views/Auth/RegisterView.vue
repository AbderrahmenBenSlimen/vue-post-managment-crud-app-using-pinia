<script setup>
import { onMounted, reactive } from "vue";
import { useAuthStore } from "@/stores/useAuthStore";
const authStore = useAuthStore();
import { storeToRefs } from "pinia";

/*
Second way to use authenticate and errors 
const { authenticate } = useAuthStore();
const { errors } = storeToRefs(useAuthStore()); 
*/

const formData = reactive({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
});
onMounted(() => {
    authStore.errors = {};
})
</script>

<template>
    <main>
        <h1 class="title">Register new account</h1>
        <form @submit.prevent="authStore.authenticate('register', formData)" action="" class="w-1/2 mx-auto space-y-6">
            <div>
                Name:
                <input type="text" v-model="formData.name">
                <p v-if="authStore.errors.name" class="error">{{ authStore.errors.name[0] }}</p>
            </div>
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
                Password Confirmation:
                <input type="password" v-model="formData.password_confirmation">


            </div>

            <div>
                <button class="primary-btn">Register</button>
            </div>
        </form>
    </main>
</template>

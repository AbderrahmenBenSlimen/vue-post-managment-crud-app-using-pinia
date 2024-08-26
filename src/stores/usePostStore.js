import { defineStore } from 'pinia'
import { useAuthStore } from "@/stores/useAuthStore";

export const usePostStore = defineStore('postStore', {
    state: () => ({
        errors: {}
    }),
    actions: {
        async update(post, formData) {
            const res = await fetch(`/api/posts/${post.id}`, {
                method: 'put',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(formData)
            })
            const data = await res.json();
            if (data.errors) {
                this.errors = data.errors;
            }
            else {
                this.router.push({ name: 'show', params: { id: post.id } });
                this.errors = {};
            }
        },
        async destroy(post) {
            const authStore = useAuthStore();
            if (authStore.user.id === post.user_id) {
                const res = await fetch(`/api/posts/${post.id}`, {
                    method: 'delete',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                })
                const data = await res.json();
                if (res.ok) {
                    this.router.push({ name: 'home' });
                }
                console.log(data);
            }
            else {
                console.log('You are not authorized to delete this post');
            }


        },
        async show(post) {
            const res = await fetch(`/api/posts/${post}`);
            const data = await res.json();
            return data.post
        },
        async index() {
            const res = await fetch('/api/posts');
            const data = await res.json();
            return data
        },
        async store(formData) {
            const res = await fetch('/api/posts', {
                method: 'post',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(formData)
            });
            const data = await res.json();

            if (data.errors) {
                this.errors = data.errors;
            }
            else {
                this.router.push({ name: 'home' });
            }
        }
    }
})
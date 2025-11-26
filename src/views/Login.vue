<template>
    <div>
        <h1 class="text !text-black">Login</h1>
        <input v-model="email" placeholder="Email" class="text !text-black" />
        <input v-model="password" type="password" placeholder="Password" class="text !text-black" />
        <button @click="handleLogin" class="text !text-black border border-black">Login</button>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import { useAuthStore } from '../stores/auth';
    import { useRouter } from 'vue-router';
    
    const email = ref('');
    const password = ref('');
    const authStore = useAuthStore();
    const router = useRouter();
    
    const handleLogin = async () => {
    try {
        await authStore.login({ email: email.value, password:
        password.value });
        alert('Login berhasil!');
        if(authStore.userType=="volunteer"){
             router.push('/following');
        }else{
            router.push('/profile/organizer/me')
        }
    } catch (err) {
        alert('Login gagal!');
        console.error(err);
    }
};
</script>
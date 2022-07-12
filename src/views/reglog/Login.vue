<template>
<div class="login-form">
    <div>
        <input type="text" placeholder="Email" v-model="user.email" />
        <br />
        <input type="password" placeholder="Password" v-model="user.password" />
        <br />

        <button @click="login">LOGIN</button>

    </div>

</div>
</template>

<script>
export default {
    name: 'login-vue',
    data() {
        return {
            user: {
                email: '',
                password: ''
            },
            findingUser: null
        }
    },
    methods: {
        login() {
            this.$api.get(`/users?email=${this.user.email}`)
                .then(response => {
                    const data = response.data;

                    if (data && data.length > 0) {
                        this.checkPassword(data[0])
                    } else {
                        alert('User not found')
                    }
                }, error => console.log(error))
        },
        checkPassword(data) {
            if (data.password === this.user.password) {
                localStorage.setItem('Authorization', data.password);
                this.$router.push('/admin')
            } else {
                alert('Password incorrect')
            }
        }
    }
}
</script>

<style>
.login-form{
    margin-top: 200px;
    margin-left: 250px;
}
.login-form input {
    font-size: 14px;
    font-style: italic;
    border: 1px solid #ccc;
    border-radius: 3px;
    padding: 5px 10px;
    margin-top: 5px;
    min-width: 250px;
}

.login-form input :focus-visible {
    outline: #d42d2d;
    border-color: #8e8a8a;
}
.login-form div{
    margin-top: 50px;
}
.login-form button{
    margin-top: 10px;
}
</style>

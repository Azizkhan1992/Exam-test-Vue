<template>
<div class="main-container">
    <header-layout />
    <div class="main-body">
        <main-menu/>
        <div class="main-content">
            <router-view></router-view>
        </div>
    </div>
    
    <footer-layout/>
</div>
</template>

<script>
import HeaderLayout from './HeaderLayout.vue'
import MainMenu from './MainMenu.vue'
import FooterLayout from './FooterLayout.vue'
export default {
    name: 'main-dashboard-layout',
    components: {
        HeaderLayout,
        MainMenu,
        FooterLayout
    }
}
</script>

<style scoped>
    .main-container{
        width: 100%;
        height: 100vh;
    }
.main-body {
    display: flex;
    height: 88%;
}

.main-content {
    margin: 20px;
}
</style>
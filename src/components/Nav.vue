<template>
<div class="nav-container">
    <div>
        <h2>Assalom Aleykum!</h2>
        <h4>Bu Amaliyot uchun ishlangan Test dasturi</h4>
    </div>

    <ul>
        <li>
            <button>
                <router-link to="/registration"><img :src="`/signUp.svg`" width="90px" height="90px" /></router-link>
            </button>
        </li>
        <li>
            <button>
                <router-link to="/login"><img :src="`/logIn.svg`" width="90px" height="90px" /></router-link>
            </button>
        </li>
    </ul>
</div>
</template>

<script>
export default {
    name: 'nav-app'
}
</script>

<style>
.nav-container {
    float: right;
    margin: 5px;
    margin-right: 25px;
    margin-top: 25px;
    min-width: 100px;
    min-height: 100px;
}

.nav-container ul li {
    list-style: none;
    display: flex;
    border: 1px solid #ccc;
    margin: 5px;
    border-radius: 4px;
    position: relative;
}
.nav-container div{
    position: absolute;
    margin-top: 100px;
    margin-right: 50px;
}
.nav-container div h2{
    font-weight: 600;
    font-size: 28px;
}
.nav-container div h2, h4{
    font-style: italic;
}
.nav-container ul li button{
    margin: 5px;
}
</style>

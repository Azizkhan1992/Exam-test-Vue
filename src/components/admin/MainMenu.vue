<template>
<div class="menu">
    <ul>
        <li>
            <router-link to="/admin/exam"><h4>Examination</h4></router-link>
        </li>
        <li>
            <router-link to="/admin/exam/create-exam"><h4>Create Examination</h4></router-link>
        </li>
        <li>
            <router-link to="/admin/exam/get-exam"><h4>Get exam</h4></router-link>
        </li>
        <li>
            <router-link to="/admin/contact"><h4>Contacts</h4></router-link>
        </li>
    </ul>
</div>
</template>

<script>
export default {

}
</script>
<style scoped>
.menu{
    margin-top: 10px;
    width: 250px;
    height: 550px;
    box-shadow: 5px 0 5px 0 rgb(0, 0, .1);
    background-color: green;
}
.menu ul{
    margin-top: 25px;
    list-style-type: none;
}
.menu ul li a{
    text-decoration: none;
    color: black;
}
</style>
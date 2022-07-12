<template>
<div class="contact-item-container">
    <h3>{{contact.first_name}}</h3>
    <h3>{{contact.last_name}}</h3>
</div>
</template>
<script>
export default {
    name: 'search-contact-item',
    props:{
        contact:{
            type: Object,
        }
    }
}
</script>
<style scoped>
.contact-item-container{
    position: relative;
    top: 120px;
}
.contact-item-container h3{
    color: black;
}
</style>
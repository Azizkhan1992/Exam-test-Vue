<template>
<div class="search-container">
    <h3>Search Contact by Name</h3>
    <div id="search-fix">
        <input type="text" id="search-contact" v-model="search_value"/>
        <span id="search-btn" @click="search"><img :src="`/search.svg`" width="25px" height="25px"/></span>
    </div>
    
    <div id="search-item" v-for="(contact, idx) in filteredContacts" :key="idx">
        <SearchContactItem :contact="contact" />
    </div>
</div>
</template>
<script>
import SearchContactItem from './SearchContactItem.vue'
export default{
    name: 'search-contact',
    data(){
        return{
            search_value: '',
            contacts: [],
            filteredContacts: null
        }
    },
    components:{
        SearchContactItem
    },
    mounted(){
        this.getAllContacts()
    },
    methods:{
        getAllContacts(){
            this.$api.get('/contacts')
            .then(response=>{
                this.contacts = response.data
            },
            error=>{console.log(error)}
            )
        },
        search(){
            this.filteredContacts = this.getFilteredContacts()
        },
        getFilteredContacts(){
            return this.contacts.filter(contact=> contact.first_name.toLowerCase().includes(this.search_value.toLocaleLowerCase()))
        }
    }
}
</script>
<style>
.search-container{
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: green;
    padding: 16px;
    margin-bottom: 15px;
}
.search-container #search-fix{
    position: absolute;
    left: 300px;
}
.search-container h3{
    color: #ffffff;
}
.search-container #search-contact{
    padding: 8px;
    color: #ffffff;
    background: #e7e7e7e7;
}
.search-container span{
    position: relative;
    right: 50px;
}
.search-container #search-fix span{
    position: absolute;
    left: 250px;
    top: 5px;
}
</style>
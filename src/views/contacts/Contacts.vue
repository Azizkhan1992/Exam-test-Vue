<template>
<div class="contact-container">
    <SearchContact/>
    <div id="add-contact-btn">
        <button><router-link to="/admin/contact/create-contact"><img :src="`/plus.svg`" width="25" height="25"/></router-link></button>
    </div>
     
     <div id="contact-table">
        <table>
       
        <thead>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone Number</th>
            <th>Actions</th>
        </thead>
        <tbody>
            <tr v-for="(contact, idx) in contacts" :key="idx">
                <td>{{contact.first_name}}</td>
                <td>{{contact.last_name}}</td>
                <td>{{contact.phone_number}}</td>
                <td>
                    <router-link :to="`/admin/contact/create-contact/${idx+1}`"><button><svg color="black" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                            </svg></button></router-link>

                            <button @click="deleteContact(contact.id)"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                        </svg></button>
                </td>
            </tr>
        </tbody>
    </table>
     </div>
    
</div>
</template>
<script>
import SearchContact from './components/SearchContact.vue'

export default {
    name: 'Contacts-vue',
    data(){
        return{
            contacts: null,
        }
    },
    components:{
        SearchContact
    },
    mounted(){
        this.getContacts()
    },
    methods:{
        getContacts(){
            this.$api.get('/contacts')
            .then(response=>{
                this.contacts = response.data
            },
            error=> {console.log(error)}
            )
        },
        deleteContact(id){
            this.$api.delete(`/contacts/${id}`)
            .then(response=> {
                console.log(response)
            },
            error => {console.log(error)}
            )
        }
    }
}
</script>
<style scoped>
.contact-container{
    position: absolute;
    min-width: 700px;
}
.contact-container #add-contact-btn{
    float: right;
}

.contact-container #add-contact-btn button{
    padding-top: 5px;
}

.contact-container #contact-table button{
    min-width: 25px;
    height: 25px;
    margin-left: 15px;
}

</style>
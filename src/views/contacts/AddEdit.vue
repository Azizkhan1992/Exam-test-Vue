<template>
<div id="contact-add-edit">
    <input type="text" placeholder="First Name" v-model="contacts.first_name" />
    <br />
    <input type="text" placeholder="Last Name" v-model="contacts.last_name" />
    <br />
    <input type="text" placeholder="Phone Number" v-model="contacts.phone_number" />
    <br />
    <button @click="contactAdd">Saqlash</button>
</div>
</template>

<script>


export default {
    name: 'create-contact',
    data() {
        return {
            contacts: {
                first_name: null,
                last_name: null,
                phone_number: null
            },
            isEdit: false,
            contactId: null,
            getUpdateContacts1: []
        }
    },
    mounted() {
        this.getContactId()
        this.getUpdateContacts()
        this.getAllContacts()
    },
    methods: {
        getContactId() {
            this.contactId = this.$route.params.id
            if (this.contactId) {
                this.isEdit = true
            }
        },
        getUpdateContacts() {
            if (this.isEdit) {
                this.updateContacts(this.contactId)
            }
        },
        updateContacts(id) {
            if (this.isEdit && this.contactId) {
                this.$api.get(`/contacts/${id}`)
                    .then(response => {
                            this.contacts = response.data
                        },
                        error => {
                            console.log(error)
                        }
                    )
            }
        },
        getAllContacts(){
            if(this.isEdit){
                this.$api.get('/contacts')
                .then(response=> {
                    this.getUpdateContacts1 = response.data
                },
                error => {console.log(error)}
                )
            }
        },
        contactAdd() {
            if(this.isEdit){
                this.$api.put(`/contacts/${this.contactId}`, this.contacts)
                .then(response => {
                    console.log(response)
                },
                error => {console.log(error)}
                )
            }
            else{
                this.$api.post('/contacts', this.contacts)
                .then(response => {}, error => {
                        console.log(error)
                    })
                }
            }
            
    }
}
</script>

<style>
#contact-add-edit {
    margin-left: 25px;
    margin-top: 25px;
}

#contact-add-edit input {
    margin: 5px;
    font-size: 14px;
    font-style: italic;
    border: 1px solid #ccc;
    border-radius: 3px;
    padding: 5px 10px;
}

#contact-add-edit input:focus-visible {
    outline: #d42d2d;
    border-color: #8e8a8a;
}

#contact-add-edit button {
    margin-top: 15px;
}
</style>

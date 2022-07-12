<template>
<v-app id="inspare">
    <v-container>
        <v-layout wrap>
            <v-flex sm6 md9 offset-md1>
                <v-card elevation="12" light tag="section">
                    <v-card-text>
  <form id="registration-form">
    <v-text-field
      v-model="user.phone"
      :error-messages="phoneErrors"
      :counter="13"
      label="Phone"
      required
      @input="$v.user.phone.$touch()"
      @blur="$v.user.phone.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="user.name"
      :error-messages="nameErrors"
      :counter="10"
      label="Name"
      required
      @input="$v.user.name.$touch()"
      @blur="$v.user.name.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="user.password"
      :error-messages="passwordErrors"
      label="Password"
      required
      type="password"
      @input="$v.user.password.$touch()"
      @blur="$v.user.password.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="user.email"
      :error-messages="emailErrors"
      label="E-mail"
      required
      @input="$v.user.email.$touch()"
      @blur="$v.user.email.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="user.PINFL"
      :error-messages="PINFLErrors"
      label="PINFL"
      required
      @input="$v.user.PINFL.$touch()"
      @blur="$v.user.PINFL.$touch()"
    ></v-text-field>
    <!-- <v-text-field
      v-model="user.birthday_date"
      label="Birthday Date"
      required
      type="number"
    ></v-text-field> -->
    <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="date"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="user.birthday_date"
            label="Picker in menu"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="user.birthday_date" no-title scrollable>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
          <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
        </v-date-picker>
      </v-menu>

    <v-btn
      class="mr-4"
      @click="register"
    >
      Register
    </v-btn>
  </form>
  </v-card-text>
  </v-card>
  </v-flex>
  </v-layout>
  </v-container>
  </v-app>
</template>
<script>
  import { validationMixin } from 'vuelidate'
  import { required, maxLength, email } from 'vuelidate/lib/validators'

  export default {
    name: 'registration-app',
    mixins: [validationMixin],

    validations: {
      user: {
        name: { required, maxLength: maxLength(10) },
        email: { required, email },
        phone: {required},
        password: {required},
        PINFL: {required},
      }
    },

    data: () => ({
      user: {
        name: '',
        email: '',
        phone: '',
        password: '',
        PINFL: '',
        birthday_date: '',
      },
      date: new Date().toISOString().substring(0, 10),
      menu: false,
    }),

    computed: {
      nameErrors () {
        const errors = []
        if (!this.$v.user.name.$dirty) return errors
        !this.$v.user.name.maxLength && errors.push('Name must be at most 10 characters long')
        !this.$v.user.name.required && errors.push('Name is required.')
        return errors
      },
      phoneErrors () {
        const errors = []
        if (!this.$v.user.phone.$dirty) return errors
        !this.$v.user.phone.required && errors.push('Phone is required.')
        return errors
      },
      PINFLErrors () {
        const errors = []
        if (!this.$v.user.PINFL.$dirty) return errors
        !this.$v.user.PINFL.required && errors.push('PINFL is required.')
        return errors
      },
      passwordErrors () {
        const errors = []
        if (!this.$v.user.password.$dirty) return errors
        !this.$v.user.password.required && errors.push('Password is required.')
        return errors
      },
      emailErrors () {
        const errors = []
        if (!this.$v.user.email.$dirty) return errors
        !this.$v.user.email.email && errors.push('Must be valid e-mail')
        !this.$v.user.email.required && errors.push('E-mail is required')
        return errors
      },
    },

    methods: {
       register(){
            this.$api.post('/users', this.user)
            .then(response => {
                this.$router.push('/login')
            }, error => console.log(error))
        }
    },
  }
</script>
<style>
#registration-form input{
    font-size: 14px;
    font-style: italic;
    padding: 5px 10px;
    margin-top: 5px;
    min-width: 250px;
}
</style>
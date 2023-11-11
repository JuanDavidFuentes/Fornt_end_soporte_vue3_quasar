<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { inject } from 'vue'
import { useRouter } from "vue-router";
import { useTokenStore } from "../store/token.js";
import { useUsuarioStore } from '../store/usuario.js';
const swal = inject('$swal') 


const router = useRouter();

const useToken = useTokenStore()
const useUsuario = useUsuarioStore()
const isPwd = ref(true)



const email = ref('')
const password = ref('')
const login = () => {
  axios.post('/usuarios/login', {
    email: email.value.toUpperCase(),
    password: password.value
  })
    .then(response => {
      useToken.getToken(response.data.token)
      localStorage.setItem("token",JSON.stringify(response.data.token))
      useUsuario.getUsuarioLogin(response.data.usuario)
      localStorage.setItem("usuario",JSON.stringify(response.data.usuario))
      router.push('/home')
    })
    .catch(error => {
      if (error.response.data.errores) {
        swal.fire({
          icon: 'error',
          title: error.response.data.errores.errors[0].msg,
          showConfirmButton: false,
          timer: 1500
        })
      } else {
        swal.fire({
          icon: 'error',
          title: error.response.data.msg,
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
}
</script>

<template>
  <q-page class="flex flex-center"
    style="background-image: url(https://images.unsplash.com/photo-1464618663641-bbdd760ae84a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80);">
    <q-card class="shadow-2 my_card bg-white" dark bordered>
      <q-card-section class="text-center bg-black">
        <div class="text-white text-h5 text-weight-bold text-left">Inicia Sesión</div>
      </q-card-section>
      <q-separator />
      <q-card-section class="text-right ">

        <q-input class="q-mt-sm" rounded outlined v-model="email" label="Correo electronico" lazy-rules
          :rules="[val => val && val.length > 0 || 'Porfavor ingresa tu correo']">
        </q-input>

        <q-input rounded outlined class="q-mt-sm" v-model="password" label="Contraseña"
          :type="isPwd ? 'password' : 'text'" :rules="[
            val => val !== null && val !== '' || 'Por favor ingresa tu contraseña',
            val => val.length > 7 || 'La contraseña debe tener mas de 7 caracteres'
          ]">
          <template v-slot:append>
            <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
          </template>
        </q-input>

        <q-btn color="black" rounded size="lg" label="Ingresar" no-caps @click="login()"></q-btn>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<style>
.my_card {
  width: 40rem;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
}
</style>
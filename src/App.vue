<script setup>
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import { useTokenStore } from './store/token';
import { useUsuarioStore } from './store/usuario';
import { useRouter } from "vue-router";
const router = useRouter();

const useUsuario = useUsuarioStore()

const useToken = useTokenStore()

useToken.getToken()

useUsuario.getUsuarioLogin()


const leftDrawerOpen = ref(false)
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}


const salir = ()=>{
  router.replace("/")
  localStorage.setItem("token",JSON.stringify(""))
  localStorage.setItem("usuario",JSON.stringify(""))
  useToken.token = ""
}
</script>

<template>
  <q-layout view="hHh LpR fFf">
    <q-header elevated class="bg-black text-white">
      <q-toolbar>
        <q-btn v-if="useToken.token" dense flat round icon="menu" @click="toggleLeftDrawer"></q-btn>
        <q-toolbar-title>
          Soporte la perla
        </q-toolbar-title>
        <q-btn v-if="useToken.token" outline rounded icon="arrow_back_ios" color="white" @click="salir()">
          Salir
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer v-if="useToken.token" v-model="leftDrawerOpen" :width="250" side="left" overlay behavior="mobile" class="bg-black" dark elevated>
      <q-img class="absolute-top" src="https://cdn.quasar.dev/img/material.png" style="height: 150px">
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="60px" class="q-mb-sm">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
          </q-avatar>
          <div class="text-weight-bold">{{ useUsuario.usuario.nombre }}</div>
        </div>
      </q-img>

      <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
        <q-list padding>
          <q-item clickable to="/home" v-ripple>
            
            <q-item-section avatar>
              <q-icon name="home" />
            </q-item-section>

            <q-item-section>
              Home
            </q-item-section>
          </q-item>

          <q-item clickable to="/user" v-ripple>
            <q-item-section avatar>
              <q-icon name="person" />
            </q-item-section>

            <q-item-section>
              Usuarios
            </q-item-section>
          </q-item>

          <q-item clickable to="/send" v-ripple>
            <q-item-section avatar>
              <q-icon name="local_shipping" />
            </q-item-section>

            <q-item-section>
              Envíos
            </q-item-section>
          </q-item>

          <q-item clickable to="settings" v-ripple>
            <q-item-section avatar>
              <q-icon name="settings" />
            </q-item-section>

            <q-item-section>
              Configuración
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container style="background-color: bisque;">
      <RouterView />
    </q-page-container>

    <q-footer elevated class="bg-black text-white">
      <q-toolbar>
        <q-toolbar-title class="text-center">
          <span class="text-bold">Soporte</span><span> - {{ new Date().getFullYear() }}</span>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>


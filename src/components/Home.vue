<script setup>
// import { useTokenStore } from "../store/token.js";
// const useToken = useTokenStore()
// useToken.getToken("")
</script>

<template>
    <q-page class="flex flex-center">
        <div class="row" style="width: 100%;">
            <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 col-xl-3">
                <q-card class="q-ma-sm q-pa-sm bg-black my-card" dark bordered>
                    <q-card-section horizontal>
                        <q-card-section style="width: 60%;">
                            <div class="text-h5 q-mt-sm q-mb-xs">Crear nuevo <br> usuario</div>
                        </q-card-section>
                        <q-card-section class="col-5 text-right">
                            <q-avatar size="120px" class="bg-white">
                                <img src="../assets/IconoUsuario.png">
                            </q-avatar>
                        </q-card-section>
                    </q-card-section>
                    <q-card-section horizontal>
                        <q-btn outline rounded icon="person_add" color="white" label="Crear Usuario" to="/user"></q-btn>
                    </q-card-section>
                </q-card>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 col-xl-3">
                <q-card class="q-ma-sm q-pa-sm bg-black my-card" dark bordered>
                    <q-card-section horizontal>
                        <q-card-section style="width: 60%;">
                            <div class="text-h5 q-mt-sm q-mb-xs">Crear nuevo <br> equipo </div>
                        </q-card-section>
                        <q-card-section class="col-5 text-right">
                            <q-avatar size="120px" class="bg-white">
                                <img src="../assets/IconoEquipos.png">
                            </q-avatar>
                        </q-card-section>
                    </q-card-section>
                    <q-card-section horizontal>
                        <q-btn outline rounded icon="print" color="white" label="Crear Equipo" to="/machine"></q-btn>
                    </q-card-section>
                </q-card>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 col-xl-3">
                <q-card class="q-ma-sm q-pa-sm bg-black my-card" dark bordered>
                    <q-card-section horizontal>
                        <q-card-section style="width: 60%;">
                            <div class="text-h5 q-mt-sm q-mb-xs">Crear nuevo <br> envío </div>
                        </q-card-section>
                        <q-card-section class="col-5 text-right">
                            <q-avatar size="120px" class="bg-white">
                                <img src="../assets/IconoEnvios.png">
                            </q-avatar>
                        </q-card-section>
                    </q-card-section>
                    <q-card-section horizontal>
                        <q-btn outline rounded icon="outbox" color="white" label="Crear Envío" to="/send"></q-btn>
                    </q-card-section>
                </q-card>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 col-xl-3">
                <q-card class="q-ma-sm q-pa-sm bg-black my-card" dark bordered>
                    <q-card-section horizontal>
                        <q-card-section style="width: 60%;">
                            <div class="text-h5 q-mt-sm q-mb-xs">Configuración</div>
                        </q-card-section>
                        <q-card-section class="col-5 text-right">
                            <q-avatar size="120px" class="bg-white">
                                <img src="../assets/settings.png">
                            </q-avatar>
                        </q-card-section>
                    </q-card-section>
                    <q-card-section horizontal>
                        <q-btn outline rounded color="white" label="Configuración" icon="settings" to="settings"></q-btn>
                    </q-card-section>
                </q-card>
            </div>
        </div>
    </q-page>
</template>

<style></style>
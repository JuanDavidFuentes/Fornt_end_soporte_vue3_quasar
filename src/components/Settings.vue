<script setup>

</script>


<template>
    <q-page class="flex flex-center">
        <div class="row justify-center" style="width: 100%;">
            <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 col-xl-3">
                <q-card class="q-ma-sm q-pa-sm bg-black my-card" dark bordered>
                    <q-card-section horizontal>
                        <q-card-section style="width: 60%;">
                            <div class="text-h5 q-mt-sm q-mb-xs">Crear nueva <br> ciudad</div>
                        </q-card-section>
                        <q-card-section class="col-5 text-right">
                            <q-avatar size="120px" class="bg-white">
                                <img src="../assets/IconoCity.png">
                            </q-avatar>
                        </q-card-section>
                    </q-card-section>
                    <q-card-section horizontal>
                        <q-btn outline rounded icon="apartment" color="white" label="Crear Ciudad" to="/citys"></q-btn>
                    </q-card-section>
                </q-card>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 col-xl-3">
                <q-card class="q-ma-sm q-pa-sm bg-black my-card" dark bordered>
                    <q-card-section horizontal>
                        <q-card-section style="width: 60%;">
                            <div class="text-h5 q-mt-sm q-mb-xs">Crear nueva <br> empresa</div>
                        </q-card-section>
                        <q-card-section class="col-5 text-right">
                            <q-avatar size="120px" class="bg-white">
                                <img src="../assets/IconoEmpresas.png">
                            </q-avatar>
                        </q-card-section>
                    </q-card-section>
                    <q-card-section horizontal>
                        <q-btn outline rounded color="white" label="Crear Empresa" icon="business" to="companies"></q-btn>
                    </q-card-section>
                </q-card>
            </div>
        </div>
    </q-page>
</template>
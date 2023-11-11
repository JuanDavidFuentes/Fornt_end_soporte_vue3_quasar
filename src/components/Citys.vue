<script setup>
import { ref, onBeforeMount, inject } from 'vue';
import { useGetCitys } from "../composables/getCitys.js";
const swal = inject('$swal')
// tabla
const rows = ref([]);
const columns = [
    { name: 'coddepartamento', label: 'Código Departamento', align: 'left', field: 'coddepartamento', sortable: true },
    { name: 'departamento', label: 'Departamento', align: 'left', field: 'departamento' },
    { name: 'codciudad', label: 'Código Ciudad', align: 'left', field: 'codciudad', sortable: true },
    { name: 'ciudad', label: 'Ciudad', align: 'left', field: 'ciudad' },
];
const filter = ref("")
const initialPagination = {
    rowsPerPage: 10
}


// traer la informacion de las ciudades
const useCitys = useGetCitys()
onBeforeMount(async () => {
    await useCitys.getData()
    rows.value = useCitys.citys.value
})


//dialog
const fixed = ref(false)
const nameDepartament = ref("")
const codeDepartament = ref("")
const nameCity = ref("")
const codeCity = ref("")

const postCity = async (nameDepartament, codeDepartament, nameCity, codeCity) => {
    const data = await useCitys.crearCiudadPost(nameDepartament, codeDepartament, nameCity, codeCity)
    if (data.msg) {
        fixed.value = false;
        swal.fire({
            icon: "success",
            title: data.msg,
            showConfirmButton: false,
            timer: 1500,
        });
        cancel();
        await useCitys.getData();
        rows.value = useCitys.citys.value
    } else {
        fixed.value = false;
        swal.fire({
            position: "top-end",
            icon: "error",
            title: data.response.data.errores.errors[0].msg,
            showConfirmButton: false,
            timer: 1500,
        });
        setTimeout(() => {
            fixed.value = true;
        }, 1500);
    }
}

const cancel = () => {
    nameDepartament.value = "";
    codeDepartament.value = "";
    nameCity.value = "";
    codeCity.value = "";
    fixed.value = false;
}
</script>

<template>
    <q-page class="q-pa-xl text-center">
        <q-dialog v-model="fixed" persistent transition-show="rotate" transition-hide="rotate">
            <q-card style="width: 700px; max-width: 80vw;">
                <q-card-section class="row">
                    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 q-pa-sm">
                        <q-input rounded outlined v-model="nameDepartament" label="Nombre del departamento*" lazy-rules
                            :rules="[val => val && val.length > 0 || 'Porfavor ingresa el nombre del departamento']" />
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 q-pa-sm">
                        <q-input rounded outlined v-model="codeDepartament" type="number" label="Código del departamento*"
                            lazy-rules
                            :rules="[val => val && val.length > 0 || 'Porfavor ingresa el código del departamento']" />
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 q-pa-sm">
                        <q-input rounded outlined v-model="nameCity" label="Nombre de la ciudad*" lazy-rules
                            :rules="[val => val && val.length > 0 || 'Porfavor ingresa el nombre de la ciudad']" />
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 q-pa-sm">
                        <q-input rounded outlined v-model="codeCity" type="number" label="Código de la ciudad*" lazy-rules
                            :rules="[val => val && val.length > 0 || 'Porfavor ingresa el código de la ciudad']" />
                    </div>
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn rounded outline label="Cancerlar" color="red" @click="cancel()" />
                    <q-btn rounded outline label="Aceptar" color="green"
                        @click="postCity(nameDepartament, codeDepartament, nameCity, codeCity)" />
                </q-card-actions>
            </q-card>
        </q-dialog>
        <q-btn rounded color="green" class="q-mb-md" icon="add_circle" label="Crea una ciudad" @click="fixed = true">
            <q-tooltip>Crear Ciudad</q-tooltip>
        </q-btn>
        <q-table :grid="$q.screen.xs" flat bordered title="Ciudades" :pagination="initialPagination" :filter="filter"
            :rows="rows" :columns="columns" row-key="name">
            <template v-slot:top-right>
                <q-input color="black" v-model="filter" placeholder="Buscar">
                    <template v-slot:append>
                        <q-icon name="search" />
                    </template>
                </q-input>
            </template>
        </q-table>
    </q-page>
</template>
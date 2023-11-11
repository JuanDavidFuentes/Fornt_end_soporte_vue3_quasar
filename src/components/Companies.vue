<script setup>
import { ref, onBeforeMount, inject } from 'vue';
import { useGetCompanies } from '../composables/getCompanies';
const swal = inject('$swal')
// tabla
const rows = ref([]);
const columns = [
    { name: 'nombre', label: 'Nombre', align: 'left', field: 'nombre' },
    { name: 'estado', label: 'Estado', align: 'left', field: 'estado', sortable: true },
    { name: 'opciones', label: 'Opciones', align: 'left', field: 'opciones' },
];
const filter = ref("")



// traer la informacion de las empresas
const useCompanies = useGetCompanies()
onBeforeMount(async () => {
    await useCompanies.getData()
    rows.value = useCompanies.companies.value
})


//dialog
const fixed = ref(false)
const name = ref("")


// post put
const postEmpresa = async (name) => {
    const data = await useCompanies.crearEmpresaPost(name)
    if (data.msg) {
        fixed.value = false;
        swal.fire({
            icon: "success",
            title: data.msg,
            showConfirmButton: false,
            timer: 3500,
        });
        cancel();
        await useCompanies.getData();
        rows.value = useCompanies.companies.value
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

const activar = async (id) => {
    const  data  = await useCompanies.activarEmpresa(id);
    if (data.msg) {
        swal.fire({
            icon: "success",
            title: data.msg,
            showConfirmButton: false,
            timer: 1500,
        });
        cancel()
        await useCompanies.getData();
        rows.value = useCompanies.companies.value;
    } else {
        swal.fire({
            position: "top-end",
            icon: "error",
            title: "Inicia sesión nuevamente",
            showConfirmButton: false,
            timer: 1500,
        });
    }
}

const inactivar = async (id) => {
    const  data  = await useCompanies.inactivarEmpresa(id);
    if (data.msg) {
        swal.fire({
            icon: "success",
            title: data.msg,
            showConfirmButton: false,
            timer: 1500,
        });
        cancel()
        await useCompanies.getData();
        rows.value = useCompanies.companies.value;
    } else {
        swal.fire({
            position: "top-end",
            icon: "error",
            title: "Inicia sesión nuevamente",
            showConfirmButton: false,
            timer: 1500,
        });
    }
}





const cancel = () => {
    name.value = "";
    fixed.value = false;
}
</script>

<template>
    <q-page class="q-pa-xl text-center">
        <q-dialog v-model="fixed" persistent transition-show="rotate" transition-hide="rotate">
            <q-card style="width: 700px; max-width: 80vw;">
                <q-card-section class="row">
                    <div class="col-12">
                        <q-input rounded outlined v-model="name" label="Nombre de la empresa*" lazy-rules
                            :rules="[val => val && val.length > 0 || 'Porfavor ingresa el nombre de la empresa']" />
                    </div>
                </q-card-section>
                <q-card-actions align="right">
                    <q-btn rounded outline label="Cancerlar" color="red" @click="cancel()" />
                    <q-btn rounded outline label="Aceptar" color="green" @click="postEmpresa(name)" />
                </q-card-actions>
            </q-card>
        </q-dialog>
        <q-btn rounded color="green" class="q-mb-md" icon="add_circle" label="Crea una empresa" @click="fixed = true">
            <q-tooltip>Crear empresa</q-tooltip>
        </q-btn>
        <q-table :grid="$q.screen.xs" flat bordered title="Empresas" :filter="filter" :rows="rows" :columns="columns"
            row-key="name">
            <template v-slot:top-right>
                <q-input color="black" v-model="filter" placeholder="Buscar">
                    <template v-slot:append>
                        <q-icon name="search" />
                    </template>
                </q-input>
            </template>
            <template v-slot:body-cell-estado="props">
                <q-td :props="props">
                    <span v-if="props.row.estado === 1" class="text-green"> Activo </span>
                    <span v-else class="text-red"> Inactivo </span>
                </q-td>
            </template>
            <template v-slot:body-cell-opciones="props">
                <q-td :props="props">
                    <q-btn :class="props.row.estado == 1 ? 'q-mx-sm' : ''" outline rounded v-if="props.row.estado === 1"
                        color="red" icon="remove_moderator" @click="inactivar(props.row._id)">
                        <q-tooltip>Inactivar empresa</q-tooltip>
                    </q-btn>
                    <q-btn :class="props.row.estado == 0 ? 'q-mx-sm' : ''" outline rounded v-else color="green"
                        icon="verified_user" @click="activar(props.row._id)">
                        <q-tooltip>Activar empresa</q-tooltip>
                    </q-btn>
                </q-td>
            </template>
        </q-table>
    </q-page>
</template>
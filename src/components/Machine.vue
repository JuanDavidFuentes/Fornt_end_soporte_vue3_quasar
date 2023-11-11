<script setup>
import { ref, onBeforeMount } from 'vue';
import { inject } from 'vue';
import { useGetMachines } from '../composables/getMachines.js';
const swal = inject('$swal');

const useMachines = useGetMachines();

// data table
const rows = ref([]);
const columns = [
    { name: 'nombre', label: 'Nombre', align: 'center', field: 'nombre' },
    { name: 'serial', label: 'Serial', align: 'center', field: 'serial', sortable: true },
    { name: 'af', label: 'AF', align: 'center', field: 'af', sortable: true },
    { name: 'estado', label: 'Estado', align: 'center', field: 'estado', sortable: true },
    { name: 'estadoMaquina', label: 'Estado la maquina', align: 'center', field: 'estadoMaquina', sortable: true },
    { name: 'opciones', label: 'Opciones', align: 'center', field: 'opciones' },
];
const filter = ref("");

// dialog
const fixed = ref(false);


//traer los datos de la base de datos

onBeforeMount(async () => {
    await useMachines.getData();
    rows.value = useMachines.machines.value;
})


// datos para el post/put
const id = ref("");
const name = ref("");
const serial = ref("");
const af = ref("");
const machineStatus = ref({
    label: 'En buen estado',
    value: 1,
});
const swich = ref(0);
const options = [
    {
        label: 'En buen estado',
        value: 1,
    },
    {
        label: 'En mal estado',
        value: 0,
    },
];

//post

const postMachine = async () => {
    const data = await useMachines.crearMachinePost(name.value, serial.value, af.value, machineStatus.value);
    if (data.msg) {
        fixed.value = false;
        swal.fire({
            icon: "success",
            title: data.msg,
            showConfirmButton: false,
            timer: 2500,
        });
        cancel();
        await useMachines.getData();
        rows.value = useMachines.machines.value;
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
    };
}

//puts

const traerDatos = (items) => {
    id.value = items._id;
    name.value = items.nombre;
    serial.value = items.serial;
    af.value = items.af;
    if (items.estadoMaquina === 1) {
        machineStatus.value = {
            label: 'En buen estado',
            value: 1,
        };
    } else {
        machineStatus.value = {
            label: 'En mal estado',
            value: 0,
        };
    };
    swich.value = 1;
    fixed.value = true;
}

const putMachine = async () => {
    const data = await useMachines.editarMachinePut(id.value, name.value, serial.value, af.value, machineStatus.value);
    if (data.msg) {
        fixed.value = false;
        swal.fire({
            icon: "success",
            title: data.msg,
            showConfirmButton: false,
            timer: 2500,
        });
        cancel();
        await useMachines.getData();
        rows.value = useMachines.machines.value;
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
    };
}

const activar = async (id) => {
    const  data  = await useMachines.activarMachine(id);
    if (data.msg) {
        swal.fire({
            icon: "success",
            title: data.msg,
            showConfirmButton: false,
            timer: 1500,
        });
        await useMachines.getData();
        rows.value = useMachines.machines.value;
        cancel()
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
    const  data  = await useMachines.inactivarMachine(id);
    if (data.msg) {
        swal.fire({
            icon: "success",
            title: data.msg,
            showConfirmButton: false,
            timer: 1500,
        });
        await useMachines.getData();
        rows.value = useMachines.machines.value;
        cancel()
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
    serial.value = "";
    af.value = "";
    machineStatus.value = {
        label: 'En buen estado',
        value: 1,
    };
    swich.value = 0;
    id.value = "";
    fixed.value = false;
}
</script>


<template>
    <q-page class="q-pa-xl text-center">
        <q-dialog v-model="fixed" persistent transition-show="rotate" transition-hide="rotate">
            <q-card style="width: 700px; max-width: 80vw;">
                <q-card-section class="row">
                    <div class="col-12  q-pa-sm">
                        <q-input rounded outlined v-model="name" label="Nombre*" lazy-rules
                            :rules="[val => val && val.length > 0 || 'Porfavor ingresa el nombre del equipo']" />
                    </div>
                    <div class="col-12  q-pa-sm">
                        <q-input rounded outlined v-model="serial" label="Serial*" lazy-rules
                            :rules="[val => val && val.length > 0 || 'Porfavor ingresa el serial']" />
                    </div>
                    <div class="col-12 q-pa-sm">
                        <q-input rounded outlined v-model="af" label="AF*" lazy-rules
                            :rules="[val => val && val.length > 0 || 'Porfavor ingresa el af del equipo']" />
                    </div>
                    <div class="col-12  q-pa-sm">
                        <q-select rounded outlined v-model="machineStatus" :options="options" label="Estado del equipo" />
                    </div>
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn rounded outline label="Cancerlar" color="red" @click="cancel()" />
                    <q-btn rounded outline label="Aceptar" color="green" v-if="swich === 0"
                        @click="postMachine(name, serial, af, machineStatus)" />
                    <q-btn rounded outline label="Editar" color="green" v-else @click="putMachine()" />
                </q-card-actions>
            </q-card>
        </q-dialog>
        <q-btn rounded color="green" class="q-mb-md" icon="add_circle" label="Crea un equipo" @click="fixed = true">
            <q-tooltip>Crear Equipo</q-tooltip>
        </q-btn>
        <q-table :dense="$q.screen.lt.md" flat bordered title="Equipos" :filter="filter" :rows="rows" :columns="columns"
            row-key="_id">
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
            <template v-slot:body-cell-estadoMaquina="props">
                <q-td :props="props">
                    <span v-if="props.row.estadoMaquina === 1" class="text-green"> Buen estado </span>
                    <span v-else class="text-red"> Mal estado </span>
                </q-td>
            </template>
            <template v-slot:body-cell-opciones="props">
                <q-td :props="props">
                    <q-btn outline rounded color="primary" icon="edit" @click="traerDatos(props.row)">
                        <q-tooltip>Editar maquina</q-tooltip>
                    </q-btn>
                    <q-btn :class="props.row.estado == 1 ? 'q-mx-sm' : ''" outline rounded v-if="props.row.estado === 1"
                        color="red" icon="remove_moderator" @click="inactivar(props.row._id)">
                        <q-tooltip>Inactivar maquina</q-tooltip>
                    </q-btn>
                    <q-btn :class="props.row.estado == 0 ? 'q-mx-sm' : ''" outline rounded v-else color="green"
                        icon="verified_user" @click="activar(props.row._id)">
                        <q-tooltip>Activar maquina</q-tooltip>
                    </q-btn>
                </q-td>
            </template>
        </q-table>
    </q-page>
</template>
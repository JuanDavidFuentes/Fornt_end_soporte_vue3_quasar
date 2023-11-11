<script setup>
import { ref, onBeforeMount } from 'vue'
import { inject } from 'vue'
import { useGetUsuarios } from '../composables/getUsuarios.js'
const swal = inject('$swal')


// data table
const rows = ref([]);
const columns = [
    { name: 'nombre', label: 'Nombre', align: 'center', field: 'nombre' },
    { name: 'apellido', label: 'Apellidos', align: 'center', field: 'apellido' },
    { name: 'documento', label: 'C.C.', align: 'center', field: 'documento', sortable: true },
    { name: 'direccion', label: 'Dirección', align: 'center', field: 'direccion' },
    { name: 'celular', label: 'Telefono', align: 'center', field: 'celular' },
    { name: 'email', label: 'Correo', align: 'center', field: 'email' },
    { name: 'estado', label: 'Estado', align: 'center', field: 'estado', sortable: true },
    { name: 'rol', label: 'Rol', align: 'center', field: 'rol', sortable: true },
    { name: 'opciones', label: 'Opciones', align: 'center', field: 'opciones' },
]
const filter = ref("")

// dialog
const isPwd = ref(true);
const fixed = ref(false);


//traer los datos de la base de datos
const { usuarios, getData, crearUsuarioPost, editarUsuarioPut, inactivarUsuario, activarUsuario } = useGetUsuarios();

onBeforeMount(async () => {
    await getData()
    rows.value = usuarios.value
})



// datos para el post/put
const id = ref("")
const name = ref("");
const lastName = ref("");
const document = ref("");
const address = ref("");
const phone = ref("");
const email = ref("");
const password = ref("");
const rol = ref("AUXILIAR");
const swich = ref(0);
const options = [
    'ADMIN', 'AUXILIAR'
]


const postUsuario = async () => {
    const data = await crearUsuarioPost(name.value, lastName.value, document.value, address.value, phone.value, email.value, password.value, rol.value, options.value)
    if (data.msg) {
        fixed.value = false;
        swal.fire({
            icon: "success",
            title: data.msg,
            showConfirmButton: false,
            timer: 1500,
        });
        cancel()
        await getData();
        rows.value = usuarios.value;
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

// put
const traerDatos = (datos) => {
    id.value = datos._id;
    name.value = datos.nombre;
    lastName.value = datos.apellido;
    document.value = datos.documento;
    address.value = datos.direccion;
    phone.value = datos.celular;
    email.value = datos.email;
    rol.value = datos.rol;
    swich.value = 1;
    fixed.value = true;
}

const putUsuarios = async () => {
    const data = await editarUsuarioPut(id.value, name.value, lastName.value, document.value, address.value, phone.value, email.value, password.value, rol.value, options.value);
    if (data.usuario) {
        fixed.value = false;
        swal.fire({
            icon: "success",
            title: "Usuario editado con exito",
            showConfirmButton: false,
            timer: 1500,
        });
        cancel()
        await getData();
        rows.value = usuarios.value;
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

const inactivar = async (id) => {
    const data = await inactivarUsuario(id)
    if (data === false) {
        swal.fire({
            icon: "error",
            title: "No puedes desactivar el usuario que estas usando actualmente",
            showConfirmButton: false,
            timer: 3000,
        });
    } else if (data.msg) {
        swal.fire({
            icon: "success",
            title: data.msg,
            showConfirmButton: false,
            timer: 1500,
        });
        cancel()
        await getData();
        rows.value = usuarios.value;
    } else {
        swal.fire({
            position: "top-end",
            icon: "error",
            title: "Inicia sesión nuevamente",
            showConfirmButton: false,
            timer: 1500,
        });
        setTimeout(() => {
            fixed.value = true;
        }, 1500);
    }
}

const activar = async (id) => {
    const data = await activarUsuario(id)
    if (data === false) {
        swal.fire({
            icon: "error",
            title: "No puedes activar el usuario que estas usando actualmente",
            showConfirmButton: false,
            timer: 3000,
        });
    } else if (data.msg) {
        swal.fire({
            icon: "success",
            title: data.msg,
            showConfirmButton: false,
            timer: 1500,
        });
        cancel()
        await getData();
        rows.value = usuarios.value;
    } else {
        swal.fire({
            position: "top-end",
            icon: "error",
            title: "Inicia sesión nuevamente",
            showConfirmButton: false,
            timer: 1500,
        });
        setTimeout(() => {
            fixed.value = true;
        }, 1500);
    }
}

const cancel = () => {
    id.value = "";
    name.value = "";
    lastName.value = "";
    document.value = "";
    address.value = "";
    phone.value = "";
    email.value = "";
    password.value = "";
    rol.value = "AUXILIAR";
    swich.value = 0;
    fixed.value = false;
}
</script>


<template>
    <q-page class="q-pa-xl text-center">
        <q-dialog v-model="fixed" persistent transition-show="rotate" transition-hide="rotate">
            <q-card style="width: 700px; max-width: 80vw;">
                <q-card-section class="row">
                    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 q-pa-sm">
                        <q-input rounded outlined v-model="name" label="Nombres*" lazy-rules
                            :rules="[val => val && val.length > 0 || 'Porfavor ingresa tus nombres']" />
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 q-pa-sm">
                        <q-input rounded outlined v-model="lastName" label="Apellidos*" lazy-rules
                            :rules="[val => val && val.length > 0 || 'Porfavor ingresa tus apellidos']" />
                    </div>
                    <div class="col-12 q-pa-sm">
                        <q-input rounded outlined v-model="address" label="Dirección*" lazy-rules
                            :rules="[val => val && val.length > 0 || 'Porfavor ingresa tu dirección']" />
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 q-pa-sm">
                        <q-input rounded outlined v-model="document" label="Documento*" lazy-rules
                            :rules="[val => val && val.length > 0 || 'Porfavor ingresa tu documento']" />
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 q-pa-sm">
                        <q-input rounded outlined v-model="phone" label="Telefono" mask="### ### ####" unmasked-value
                            lazy-rules :rules="[val => val && val.length > 0 || 'Porfavor ingresa tu telefono']" />
                    </div>
                    <div class="col-12 q-pa-sm">
                        <q-input rounded outlined v-model="email" label="Correo" lazy-rules
                            :rules="[val => val && val.length > 0 || 'Porfavor ingresa tu correo']" />
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 q-pl-sm q-pr-sm">
                        <q-input rounded outlined class="q-mt-sm" v-model="password" label="Contraseña"
                            :type="isPwd ? 'password' : 'text'" :rules="[
                                val => val !== null && val !== '' || 'Por favor ingresa tu contraseña',
                                val => val.length > 7 || 'La contraseña debe tener mas de 7 caracteres'
                            ]">
                            <template v-slot:append>
                                <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                                    @click="isPwd = !isPwd" />
                            </template>
                        </q-input>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 q-pa-sm">
                        <q-select rounded outlined v-model="rol" :options="options" label="Rol" />
                    </div>
                </q-card-section>


                <q-card-actions align="right">
                    <q-btn rounded outline label="Cancerlar" color="red" @click="cancel()" />
                    <q-btn rounded outline label="Aceptar" color="green" v-if="swich === 0" @click="postUsuario()" />
                    <q-btn rounded outline label="Editar" color="green" v-else @click="putUsuarios()" />
                </q-card-actions>
            </q-card>
        </q-dialog>
        <q-btn rounded color="green" class="q-mb-md" icon="add_circle" label="Crea un usuario" @click="fixed = true">
            <q-tooltip>Crear Usuario</q-tooltip>
        </q-btn>
        <q-table :dense="$q.screen.lt.md" flat bordered title="Usuarios" :filter="filter" :rows="rows" :columns="columns" row-key="_id">
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
                    <q-btn outline rounded color="primary" icon="edit" @click="traerDatos(props.row)">
                        <q-tooltip>Editar usuario</q-tooltip>
                    </q-btn>
                    <q-btn :class="props.row.estado == 1 ? 'q-mx-sm' : ''" outline rounded v-if="props.row.estado === 1"
                        color="red" icon="remove_moderator" @click="inactivar(props.row._id)">
                        <q-tooltip>Inactivar usuario</q-tooltip>
                    </q-btn>
                    <q-btn :class="props.row.estado == 0 ? 'q-mx-sm' : ''" outline rounded v-else color="green"
                        icon="verified_user" @click="activar(props.row._id)">
                        <q-tooltip>Activar usuario</q-tooltip>
                    </q-btn>
                </q-td>
            </template>
        </q-table>
    </q-page>
</template>
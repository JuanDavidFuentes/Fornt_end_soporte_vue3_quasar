<script setup>
import { ref, onBeforeMount, inject } from 'vue';
import { useGetEnvios } from '../composables/getEnvios.js';
import { useGetCitys } from "../composables/getCitys.js";
import { useGetCompanies } from '../composables/getCompanies';
import { useGetMachines } from '../composables/getMachines.js';
const swal = inject('$swal');
const useEnvio = useGetEnvios();
const useCitys = useGetCitys();
const useCompanies = useGetCompanies();
const useMachines = useGetMachines();



// data table sends
const rows = ref([]);
const columns = [
    { name: 'equipo', label: 'Equipo', align: 'center', field: 'equipo' },
    { name: 'ciudad', label: 'Ciudad', align: 'center', field: 'ciudad' },
    { name: 'empresa', label: 'Empresa', align: 'center', field: 'empresa', sortable: true },
    { name: 'numeroGuia', label: 'Numero de guía', align: 'center', field: 'numeroGuia' },
    { name: 'motivoEnvio', label: 'Motivo del envío', align: 'center', field: 'motivoEnvio' },
    { name: 'imgGuia', label: 'IMG-GUÍA', align: 'center', field: 'imgGuia' },
    { name: 'estado', label: 'Estado', align: 'center', field: 'estado', sortable: true },
    { name: 'opciones', label: 'Opciones', align: 'center', field: 'opciones' },
];
const filter = ref("");

// dialog crear/editar envio
const fixed = ref(false);
const id = ref("");
const idMachine = ref("");
const idCity = ref("");
const idCompany = ref("");
const guideNumber = ref("");
const shippingReason = ref("");
const swichButton = ref(0);
const swichEdit = ref(0);

const postSends = async () => {
    const data = await useEnvio.crearEnvioPost(idMachine.value, idCity.value, idCompany.value, guideNumber.value, shippingReason.value);
    if (data.msg) {
        fixed.value = false;
        swal.fire({
            icon: "success",
            title: data.msg,
            showConfirmButton: false,
            timer: 2500,
        });
        cancelSends()
        await useEnvio.getData();
        rows.value = useEnvio.sends.value;
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
};

// traer datos
const traerDatos = (items) => {
    swichEdit.value = 1;
    swichButton.value = 1;
    idMachine.value = items.idMaquina._id;
    nameMachine.value = items.idMaquina.nombre;
    id.value = items._id;
    idCity.value = {
        label: items.ciudad.ciudad,
        value: items.ciudad._id,
    }
    idCompany.value = {
        label: items.empresa.nombre,
        value: items.empresa._id
    }
    guideNumber.value = items.numeroGuia;
    shippingReason.value = items.motivoEnvio;
    fixed.value = true;
}


const putSends = async () => {
    const data = await useEnvio.editarEnvio(id.value, idMachine.value, idCity.value, idCompany.value, guideNumber.value, shippingReason.value);
    if (data.msg) {
        fixed.value = false;
        swal.fire({
            icon: "success",
            title: data.msg,
            showConfirmButton: false,
            timer: 2500,
        });
        cancelSends()
        await useEnvio.getData();
        rows.value = useEnvio.sends.value;
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


// inactivar he activar envio
const activar = async (id) => {
    const data = await useEnvio.activarEnvio(id);
    if (data.msg) {
        swal.fire({
            icon: "success",
            title: data.msg,
            showConfirmButton: false,
            timer: 1500,
        });
        await useEnvio.getData();
        rows.value = useEnvio.sends.value;
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
    const data = await useEnvio.inactivarEnvio(id);
    if (data.msg) {
        swal.fire({
            icon: "success",
            title: data.msg,
            showConfirmButton: false,
            timer: 1500,
        });
        await useEnvio.getData();
        rows.value = useEnvio.sends.value;
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


//img
const swichEditIMG = ref(0);
const fixedIMG = ref(false);
const imgGuide = ref("");
const idSendIMG = ref('');

const subir = (e) => {
    imgGuide.value = e.target.files[0]
    console.log(imgGuide.value);
}

const dialogIMG = (idImg) => {
    fixedIMG.value = true;
    idSendIMG.value = idImg
}

const cancelIMG = () => {
    fixedIMG.value = false;
    idSendIMG.value = '';
    swichEditIMG.value = 1;
    imgGuide.value = "";
}

// autocomplete of citys
let citys = [];
let dates = {};
const options = ref(citys);

function filterFn(val, update, abort) {
    update(() => {
        const needle = val.toLowerCase();
        options.value = citys.filter(v => v.label.toLowerCase().indexOf(needle) > -1);
    });
};

// autocomplete companies
let companies = [];
const optionsCompanies = ref(companies);

function filterFnCompanies(val, update, abort) {
    update(() => {
        const needle = val.toLowerCase();
        optionsCompanies.value = companies.filter(v => v.label.toLowerCase().indexOf(needle) > -1);
    });
};

const cancelSends = () => {
    cancelarSeleccionado();
    swichEdit.value = 0;
    id.value = "";
    idMachine.value = "";
    idCity.value = "";
    idCompany.value = "";
    guideNumber.value = "";
    shippingReason.value = "";
    fixed.value = false;
}

//dialog equipos
const fixedMachine = ref(false);
const rowsMachine = ref([]);
const filterMachine = ref("");
const nameMachine = ref("");
const columsMachine = [
    { name: 'nombre', label: 'Nombre', align: 'center', field: 'nombre' },
    { name: 'serial', label: 'Serial', align: 'center', field: 'serial', sortable: true },
    { name: 'af', label: 'AF', align: 'center', field: 'af', sortable: true },
    { name: 'estado', label: 'Estado', align: 'center', field: 'estado', sortable: true },
    { name: 'estadoMaquina', label: 'Estado la maquina', align: 'center', field: 'estadoMaquina', sortable: true },
    { name: 'seleccionar', label: 'Seleccionar', align: 'center', field: 'seleccionar' },
];

const traerSeleccionado = (items) => {
    idMachine.value = items._id;
    nameMachine.value = items.nombre;
    swichButton.value = 1;
    fixedMachine.value = false;
}

const cancelarSeleccionado = () => {
    swichButton.value = 0
    idMachine.value = ''
    nameMachine.value = '';
}

// dialog post equipos

const fixedPostMachine = ref(false);
const name = ref("");
const serial = ref("");
const af = ref("");
const machineStatus = ref({
    label: 'En buen estado',
    value: 1,
});
const optionsMachine = [
    {
        label: 'En buen estado',
        value: 1,
    },
    {
        label: 'En mal estado',
        value: 0,
    },
];

const postMachine = async () => {
    const data = await useMachines.crearMachinePost(name.value, serial.value, af.value, machineStatus.value);
    if (data.msg) {
        fixed.value = false;
        fixedMachine.value = false;
        fixedPostMachine.value = false;
        swal.fire({
            icon: "success",
            title: data.msg,
            showConfirmButton: false,
            timer: 2500,
        });
        setTimeout(() => {
            fixed.value = true;
            fixedMachine.value = true;
        }, 2500)
        cancelMachine();
        await useMachines.getData();
        rowsMachine.value = useMachines.machines.value;
    } else {
        fixed.value = false;
        fixedMachine.value = false;
        fixedPostMachine.value = false;
        swal.fire({
            position: "top-end",
            icon: "error",
            title: data.response.data.errores.errors[0].msg,
            showConfirmButton: false,
            timer: 1500,
        });
        setTimeout(() => {
            fixed.value = true;
            fixedMachine.value = true;
            fixedPostMachine.value = true;
        }, 1500);
    };
}

const cancelMachine = () => {
    fixedPostMachine.value = false;
    name.value = ""
    serial.value = ""
    af.value = ""
    machineStatus.value = {
        label: 'En buen estado',
        value: 1,
    }
}

//traer los datos de la base de datos

onBeforeMount(async () => {
    await useEnvio.getData();
    await useCitys.getData();
    await useCompanies.getData();
    await useMachines.getData();
    rows.value = useEnvio.sends.value;
    rowsMachine.value = useMachines.machines.value;
    useCitys.citys.value.forEach(item => { // se puede lograr de esta forma directamente en el componente
        dates = {
            label: item.ciudad,
            value: item._id
        };
        citys.push(dates);
    });
    companies = useCompanies.companiesOptions; // pero esta es mas corta y ase ver el codigo mas limpio haciendolo directamente en los composables
})
</script>



<template>
    <q-page class="q-pa-xl text-center">
        <!--Dialod de envíos-->
        <q-dialog v-model="fixed" persistent transition-show="rotate" transition-hide="rotate">
            <q-card style="width: 700px; max-width: 80vw;">
                <q-card-section class="row">
                    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 q-pa-sm q-mb-md">
                        <q-btn v-if="swichButton === 1" outline rounded icon="highlight_off" class="full-width"
                            style="height: 56px;" :label="nameMachine" @click="cancelarSeleccionado()" />

                        <q-btn v-else rounded color="black dark" class="full-width" style="height: 56px;"
                            label="Agregar equipo" @click="fixedMachine = true" />
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 q-pa-sm q-mb-md">
                        <q-select rounded outlined v-model="idCity" use-input hide-selected fill-input input-debounce="0"
                            :options="options" @filter="filterFn" label="Selecciona una ciudad">
                            <template v-slot:no-option>
                                <q-item>
                                    <q-item-section class="text-grey">
                                        Sin resultados
                                    </q-item-section>
                                </q-item>
                            </template>
                        </q-select>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 q-pa-sm q-mb-md">
                        <q-select rounded outlined v-model="idCompany" use-input hide-selected fill-input input-debounce="0"
                            :options="optionsCompanies" @filter="filterFnCompanies" label="Selecciona una empresa">
                            <template v-slot:no-option>
                                <q-item>
                                    <q-item-section class="text-grey">
                                        Sin resultados
                                    </q-item-section>
                                </q-item>
                            </template>
                        </q-select>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 q-pa-sm">
                        <q-input rounded outlined v-model="guideNumber" label="Numero de guía*" lazy-rules
                            :rules="[val => val && val.length > 0 || 'Porfavor ingresa el numero de guía']" />
                    </div>
                    <div class="col-12 q-pa-sm">
                        <q-input rounded outlined v-model="shippingReason" label="Motivo de envío*" lazy-rules
                            :rules="[val => val && val.length > 0 || 'Porfavor el motivo']" />
                    </div>
                </q-card-section>
                <q-card-actions align="right">
                    <q-btn rounded outline label="Cancelar" color="red" @click="cancelSends()" />
                    <q-btn rounded outline label="Aceptar" color="green" v-if="swichEdit === 0" @click="postSends()" />
                    <q-btn rounded outline label="Editar" color="green" v-else @click="putSends()" />
                </q-card-actions>
            </q-card>
        </q-dialog>


        <!--Img Dialog-->
        <q-dialog v-model="fixedIMG" persistent transition-show="rotate" transition-hide="rotate">
            <q-card style="width:600px; max-width: 80vw;">
                <q-card-section class="text-right">
                    <div class="container-input">
                        <input type="file" name="file-5" id="file-5" @change="subir" class="inputfile inputfile-5"
                            data-multiple-caption="{count} archivos seleccionados" multiple />
                        <label for="file-5">
                            <figure>
                                <svg xmlns="http://www.w3.org/2000/svg" class="iborrainputfile" width="20" height="17"
                                    viewBox="0 0 20 17">
                                    <path
                                        d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z">
                                    </path>
                                </svg>
                            </figure>
                            <span v-if="imgGuide === ''" class="iborrainputfile">Subir archivo</span>
                            <span v-else class="iborrainputfile">{{ imgGuide.name }}</span>
                        </label>
                    </div>
                </q-card-section>
                <q-card-actions align="right">
                    <q-btn rounded outline label="Cancelar" color="red" @click="cancelIMG()" />
                    <q-btn rounded outline label="Aceptar" color="green" @click="" />
                    <q-btn rounded outline label="Editar" color="green"  @click="" />
                </q-card-actions>
            </q-card>
        </q-dialog>

        <!--Dialog data table de equipos-->
        <q-dialog v-model="fixedMachine" persistent transition-show="rotate" transition-hide="rotate">
            <q-card style="width: 800px; max-width: 80vw;">
                <q-card-section class="row justify-center">
                    <q-table :dense="$q.screen.lt.md" flat bordered title="Equipos" :filter="filterMachine"
                        :rows="rowsMachine" :columns="columsMachine" row-key="_id">
                        <template v-slot:top-right>
                            <q-input color="black" v-model="filterMachine" placeholder="Buscar">
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
                        <template v-slot:body-cell-seleccionar="props">
                            <q-td :props="props">
                                <q-btn outline rounded color="green" icon="add_circle_outline"
                                    @click="traerSeleccionado(props.row)">
                                    <q-tooltip>Seleccionar este equipo</q-tooltip>
                                </q-btn>
                            </q-td>
                        </template>
                    </q-table>
                </q-card-section>
                <div class="text-h5 text-weight-bold text-center">
                    ¿Desea crear un equipo?
                </div>
                <q-card-actions align="center">
                    <q-btn rounded outline label="Cancelar" color="red" @click="fixedMachine = false" />
                    <q-btn rounded outline label="Aceptar" color="green" @click="fixedPostMachine = true" />
                </q-card-actions>
            </q-card>
        </q-dialog>

        <!--Post machine-->
        <q-dialog v-model="fixedPostMachine" persistent transition-show="rotate" transition-hide="rotate">
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
                        <q-select rounded outlined v-model="machineStatus" :options="optionsMachine"
                            label="Estado del equipo" />
                    </div>
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn rounded outline label="Cancelar" color="red" @click="cancelMachine()" />
                    <q-btn rounded outline label="Aceptar" color="green"
                        @click="postMachine(name, serial, af, machineStatus)" />
                </q-card-actions>
            </q-card>
        </q-dialog>




        <!-- Boton y datatable -->
        <q-btn rounded color="green" class="q-mb-md" icon="add_circle" label="Crea un envío" @click="fixed = true">
            <q-tooltip>Crear Envío</q-tooltip>
        </q-btn>
        <q-table :dense="$q.screen.lt.md" flat bordered title="Envíos" :filter="filter" :rows="rows" :columns="columns"
            row-key="_id">
            <template v-slot:top-right>
                <q-input color="black" v-model="filter" placeholder="Buscar">
                    <template v-slot:append>
                        <q-icon name="search" />
                    </template>
                </q-input>
            </template>
            <template v-slot:body-cell-equipo="props">
                <q-td :props="props">
                    <span> {{ props.row.idMaquina.nombre }} </span>
                </q-td>
            </template>
            <template v-slot:body-cell-ciudad="props">
                <q-td :props="props">
                    <span> {{ props.row.ciudad.ciudad }} </span>
                </q-td>
            </template>
            <template v-slot:body-cell-empresa="props">
                <q-td :props="props">
                    <span> {{ props.row.empresa.nombre }} </span>
                </q-td>
            </template>
            <template v-slot:body-cell-imgGuia="props">
                <q-td :props="props">
                    <q-img v-if="props.row.imgGuia" :src="props.row.imgGuia" :ratio="16 / 9">
                        <q-icon class="absolute all-pointer-events" size="25px" name="edit" color="primary"
                            style="top: 5%; left: 5%; cursor: pointer;">
                            <q-tooltip>
                                Editar imagen
                            </q-tooltip>
                        </q-icon>
                    </q-img>
                    <q-img v-else src="../src/assets/img_not_foud.png" :ratio="16 / 9">
                        <q-icon class="absolute all-pointer-events" size="25px" name="add_a_photo" color="green"
                            @click="dialogIMG(props.row._id)" style="top: 5%; left: 5%; cursor: pointer;">
                            <q-tooltip>
                                Añadir imagen
                            </q-tooltip>
                        </q-icon>
                    </q-img>
                </q-td>
            </template>
            <template v-slot:body-cell-estado="props">
                <q-td :props="props">
                    <span v-if="props.row.estado === 1" class="text-green"> Enviado </span>
                    <span v-else class="text-orange"> Recivido </span>
                </q-td>
            </template>
            <template v-slot:body-cell-opciones="props">
                <q-td :props="props">
                    <q-btn outline rounded color="primary" icon="edit" @click="traerDatos(props.row)">
                        <q-tooltip>Editar envío</q-tooltip>
                    </q-btn>
                    <q-btn :class="props.row.estado == 1 ? 'q-mx-sm' : ''" outline rounded v-if="props.row.estado === 1"
                        color="red" icon="remove_moderator" @click="inactivar(props.row._id)">
                        <q-tooltip>Marcar como <span class="text-green">'Recivido'</span></q-tooltip>
                    </q-btn>
                    <q-btn :class="props.row.estado == 0 ? 'q-mx-sm' : ''" outline rounded v-else color="green"
                        icon="verified_user" @click="activar(props.row._id)">
                        <q-tooltip>Marcar como <span class="text-orange">'Enviado'</span></q-tooltip>
                    </q-btn>
                </q-td>
            </template>
        </q-table>
    </q-page>
</template>


<style>
.container-input {
    text-align: center;
    background: #282828;
    border-top: 5px solid #c39f77;
    padding: 50px 0;
    border-radius: 6px;
    width: 100%;
    margin: 0 auto;
}

.inputfile {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
}

.inputfile+label {
    max-width: 80%;
    font-size: 1.25rem;
    font-weight: 700;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
    display: inline-block;
    overflow: hidden;
    padding: 0.625rem 1.25rem;
}

.inputfile+label svg {
    width: 1em;
    height: 1em;
    vertical-align: middle;
    fill: currentColor;
    margin-top: -0.25em;
    margin-right: 0.25em;
}

.iborrainputfile {
    font-size: 16px;
    font-weight: normal;
    font-family: 'Lato';
}

.inputfile-5+label {
    color: #c39f77;
}

.inputfile-5:focus+label,
.inputfile-5.has-focus+label,
.inputfile-5+label:hover {
    color: #9f8465;
}

.inputfile-5+label figure {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: #c39f77;
    display: block;
    padding: 20px;
    margin: 0 auto 10px;
}

.inputfile-5:focus+label figure,
.inputfile-5.has-focus+label figure,
.inputfile-5+label:hover figure {
    background-color: #9f8465;
}

.inputfile-5+label svg {
    width: 100%;
    height: 100%;
    fill: #fff;
}
</style>
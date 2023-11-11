import axios from "axios";
import { ref } from "vue";
import { useTokenStore } from "../store/token";

const { getToken, token } = useTokenStore();
getToken();

export const useGetMachines = () => {
  const machines = ref([]);

  const getData = async () => {
    try {
      const { data } = await axios.get("/maquinas");
      machines.value = data;
    } catch (error) {
      console.log(error);
    }
  };



  const crearMachinePost = async ( name, serial, af, machineStatus ) => {
    try {
      let header = { headers: { token: token } };
      const { data } = await axios.post(
        "/maquinas/",
        {
          nombre: name,
          serial: serial,
          af: af,
          estadoMaquina: machineStatus.value
        },
        header
      );
      return data;
    } catch (error) {
      return error;
    }
  };

  const editarMachinePut = async ( id, name, serial, af, machineStatus ) => {
    try {
      let header = { headers: { token: token } };
      const { data } = await axios.put(
        `/maquinas/${id}`,
        {
          nombre: name,
          serial: serial,
          af: af,
          estadoMaquina: machineStatus.value
        },
        header
      );
      return data;
    } catch (error) {
      return error;
    }
  };



  const inactivarMachine = async (id) => {
    try {
      let header = { headers: { token: token } };
      const { data } = await axios.put(`maquinas/desactivar/${id}`, {}, header);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const activarMachine = async (id) => {
    try {
      let header = { headers: { token: token } };
      const { data } = await axios.put(`maquinas/activar/${id}`, {}, header);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getData,
    crearMachinePost,
    editarMachinePut,
    inactivarMachine,
    activarMachine,
    machines,
  };
};

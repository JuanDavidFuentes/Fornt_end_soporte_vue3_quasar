import axios from "axios";
import { ref } from "vue";
import { useTokenStore } from "../store/token";

const { getToken, token } = useTokenStore();
getToken();

export const useGetEnvios = () => {
  const sends = ref([]);

  const getData = async () => {
    try {
      const { data } = await axios.get("/envios");
      sends.value = data;
    } catch (error) {
      console.log(error);
    }
  };

  const crearEnvioPost = async ( idMachine, idCity, idCompany, guideNumber, shippingReason ) => {
    const idC = idCity.value
    const idCom = idCompany.value
    try {
      let header = { headers: { token: token } };
      const { data } = await axios.post(
        "/envios/",
        {
          idMaquina: idMachine,
          ciudad: idC,
          empresa: idCom,
          numeroGuia: guideNumber,
          motivoEnvio: shippingReason,
        },
        header
      );
      return data;
    } catch (error) {
      return error;
    }
  };

  const inactivarEnvio = async (id) => {
    try {
      let header = { headers: { token: token } };
      const { data } = await axios.put(`empresas/desactivar/${id}`, {}, header);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const activarEnvio = async (id) => {
    try {
      let header = { headers: { token: token } };
      const { data } = await axios.put(`empresas/activar/${id}`, {}, header);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getData,
    crearEnvioPost,
    sends,

  };
};

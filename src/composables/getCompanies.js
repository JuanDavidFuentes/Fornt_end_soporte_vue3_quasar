import axios from "axios";
import { ref } from "vue";
import { useTokenStore } from "../store/token";

const { getToken, token } = useTokenStore();
getToken();

export const useGetCompanies = () => {
  const companies = ref([]);
  let companiesOptions = [];
  let dataOptions = {};

  const getData = async () => {
    try {
      const { data } = await axios.get("/empresas");
      companies.value = data;
      data.forEach((item) => {
        dataOptions = { label: item.nombre, value: item._id};
        companiesOptions.push(dataOptions);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const crearEmpresaPost = async (nombre) => {
    try {
      let header = { headers: { token: token } };
      const { data } = await axios.post(
        "/empresas/",
        {
          nombre: nombre,
        },
        header
      );
      return data;
    } catch (error) {
      return error;
    }
  };

  const inactivarEmpresa = async (id) => {
    try {
      let header = { headers: { token: token } };
      const { data } = await axios.put(`empresas/desactivar/${id}`, {}, header);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const activarEmpresa = async (id) => {
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
    crearEmpresaPost,
    inactivarEmpresa,
    activarEmpresa,
    companies,
    companiesOptions
  };
};

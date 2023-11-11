import axios from "axios";
import { ref } from "vue";
import { useTokenStore } from "../store/token";

const { getToken, token } = useTokenStore();
getToken();

export const useGetCitys = () => {
  const citys = ref([]);

  const getData = async () => {
    try {
      const { data } = await axios.get("/ciudades/CiudadDepartamento");
      citys.value = data.ciudad;
    } catch (error) {
      console.log(error);
    }
  };

  const crearCiudadPost = async (departamento, coddepartamento, ciudad, codciudad) => {
    try {
      let header = { headers: { "token": token } }
      const { data } = await axios.post("/ciudades/",
        {
          coddepartamento: coddepartamento,
          departamento: departamento,
          ciudad: ciudad,
          codciudad: codciudad
        },
        header
      );
      return data;
    } catch (error) {
      return error;
    }
  };

  return {
    getData,
    crearCiudadPost,
    citys,
  };
};

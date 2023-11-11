import axios from "axios";
import { ref } from "vue";
import { useTokenStore } from '../store/token';
import { useUsuarioStore } from "../store/usuario";
const { getToken, token } = useTokenStore();
useUsuarioStore().getUsuarioLogin()
const usuario = useUsuarioStore().usuario
getToken();


export const useGetUsuarios = () => {
  const usuarios = ref([]);

  const getData = async () => {
    try {
      const { data } = await axios.get("/usuarios");
      usuarios.value = data.usuarios;
    } catch (e) {
      console.log(e);
    }
  };

  const crearUsuarioPost = async ( name, lastName, document, address, phone, email, password, options ) => {
    try {
      const { data } = await axios.post("/usuarios/", {
        nombre: name,
        apellido: lastName,
        documento: document,
        direccion: address,
        celular: phone,
        email: email,
        password: password,
        rol: options,
      });
      return data;
    } catch (error) {
      return error;
    }
  };

  const editarUsuarioPut = async ( id, name, lastName, document, address, phone, email, password, options ) => {
    try {
      let header = { headers: { "token": token } }
      const { data } = await axios.put( `usuarios/datos/${id}`, {
          nombre: name,
          apellido: lastName,
          documento: document,
          direccion: address,
          celular: phone,
          email: email,
          password: password,
          rol: options,
        }, header );
      return data;
    } catch (error) {
      return error;
    }
  };

  const inactivarUsuario = async (id) =>{
    try {
      if(id == usuario._id){
        return false;
      } else {
        let header = { headers: { "token": token } }
        const { data } = await axios.put(`usuarios/desactivar/${id}`, {}, header )
        return data
      }
    } catch (error) {
      console.log(error);
    }
  }

  const activarUsuario = async (id) =>{
    try {
      if(id == usuario._id){
        return false;
      } else {
        let header = { headers: { "token": token } }
        const { data } = await axios.put(`usuarios/activar/${id}`, {}, header )
        return data
      }
    } catch (error) {
      console.log(error);
    }
  }

  return {
    getData,
    crearUsuarioPost,
    editarUsuarioPut,
    inactivarUsuario,
    activarUsuario,
    usuarios,
  };
};

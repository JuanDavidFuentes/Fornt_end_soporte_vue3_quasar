import { defineStore } from "pinia";
import { ref } from "vue";

export const useUsuarioStore = defineStore("usuario", () => {
  const usuario = ref(null);
  const getUsuarioLogin = (usuarioLogin) => {
    const tokenLocalStorage = JSON.parse(localStorage.getItem("usuario"));
    if(tokenLocalStorage){
        usuario.value = tokenLocalStorage
    } else {
        usuario.value = usuarioLogin;
    }
  };
  return {
    usuario,
    getUsuarioLogin,
  };
});

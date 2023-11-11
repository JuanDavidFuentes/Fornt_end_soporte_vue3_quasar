import { defineStore } from "pinia";
import { ref } from "vue";

export const useTokenStore = defineStore("token", () => {
  const token = ref("");
  const getToken = (x_token) => {
    const tokenLocalStorage = JSON.parse(localStorage.getItem("token"));
    if (tokenLocalStorage) {
      token.value = tokenLocalStorage;
    } else {
      token.value = x_token;
    }
  };
  return {
    token,
    getToken,
  };
});

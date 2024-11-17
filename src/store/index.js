import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    materials: [],
    currentLanguage: "en",
  },
  mutations: {
    SET_MATERIALS(state, materials) {
      state.materials = materials;
    },
    SET_LANGUAGE(state, language) {
      state.currentLanguage = language;
    },
  },
  actions: {
    async fetchMaterials({ commit }, language) {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/materials/${language}`
        );
        commit("SET_MATERIALS", response.data);
        commit("SET_LANGUAGE", language);
      } catch (error) {
        console.error("Error fetching materials:", error);
      }
    },
  },
});

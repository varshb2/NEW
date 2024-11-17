<template>
  <v-select
    v-model="selectedLanguage"
    :items="languages"
    label="Select Language"
    @change="loadLanguageMaterials"
  ></v-select>
</template>

<script>
export default {
  data() {
    return {
      selectedLanguage: "en", // Default language
      languages: [
        { id: "en", name: "English" },
        { id: "es", name: "Spanish" },
        { id: "fr", name: "French" },
        // Add more languages here
      ],
    };
  },
  methods: {
    loadLanguageMaterials() {
      this.$store.dispatch("fetchMaterials", this.selectedLanguage);
    },
  },
};
</script>

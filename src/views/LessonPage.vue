<template>
  <v-container>
    <v-row>
      <v-col v-for="material in materials" :key="material.id" cols="12" md="4">
        <v-card>
          <v-card-title>{{ material.title }}</v-card-title>
          <v-card-text v-if="material.type === 'audio'">
            <audio :src="material.audioUrl" controls></audio>
          </v-card-text>
          <v-card-text v-if="material.type === 'quiz'">
            <v-form @submit.prevent="submitQuiz">
              <div v-for="question in material.questions" :key="question.id">
                <v-text-field
                  v-model="answers[question.id]"
                  :label="question.text"
                />
              </div>
              <v-btn type="submit" color="primary">Submit</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  computed: {
    materials() {
      return this.$store.state.materials;
    },
  },
  methods: {
    submitQuiz() {
      // Handle quiz submission logic here
    },
  },
};
</script>

<template>
  <v-card class="lesson-card" max-width="400" outlined>
    <v-img v-if="lesson.image" :src="lesson.image" height="200px"></v-img>
    <v-card-title class="text-h6">
      {{ lesson.title }}
    </v-card-title>
    <v-card-subtitle>
      <v-chip color="primary" text-color="white" class="ma-2">
        {{ lesson.type }}
      </v-chip>
    </v-card-subtitle>
    <v-card-text>
      <div v-if="lesson.description">{{ lesson.description }}</div>
      <div v-else>
        <em>No description available.</em>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn
        @click="startLesson"
        color="primary"
        :disabled="!lesson.isAvailable"
      >
        Start Lesson
      </v-btn>
      <v-btn @click="viewDetails" text> More Info </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "LessonCard",
  props: {
    lesson: {
      type: Object,
      required: true,
    },
  },
  methods: {
    // Emit an event to start the lesson (e.g., navigate to the lesson page)
    startLesson() {
      this.$emit("startLesson", this.lesson.id);
    },
    // Emit an event to view more information about the lesson
    viewDetails() {
      this.$emit("viewDetails", this.lesson.id);
    },
  },
};
</script>

<style scoped>
.lesson-card {
  margin: 16px;
}

.lesson-card .v-card-title {
  font-weight: bold;
}

.lesson-card .v-card-subtitle {
  font-style: italic;
}

.lesson-card .v-btn {
  margin-right: 8px;
}
</style>

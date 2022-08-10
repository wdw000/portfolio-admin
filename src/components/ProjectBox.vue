<template>
  <ul class="project-box">
    <project-item />
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ProjectItem from "./ProjectItem.vue";

export default defineComponent({
  name: "ProjectBox",
  components: { ProjectItem },
});
</script>

<style scoped></style>

<template>
  <div class="wrap">
    <div class="left">
      <nav-box />
    </div>
    <div class="right">
      <form-component />
      <skills-box v-if="navStore.navState === 'Skills'" />
      <learning-box v-if="navStore.navState === 'Learning'" />
      <link-box v-if="navStore.navState === 'Link'" />
      <project-box v-if="navStore.navState === 'Project'" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NavBox from "./components/NavBox.vue";
import { mapStores } from "pinia";
import { useNavStore } from "./store/nav";
import FormComponent from "./components/FormComponent.vue";
import SkillsBox from "./components/SkillsBox.vue";
import LearningBox from "./components/LearningBox.vue";
import LinkBox from "./components/LinkBox.vue";
import ProjectBox from "./components/ProjectBox.vue";

export default defineComponent({
  name: "App",
  components: {
    NavBox,
    FormComponent,
    SkillsBox,
    LearningBox,
    LinkBox,
    ProjectBox,
  },
  computed: {
    ...mapStores(useNavStore),
  },
});
</script>

<style>
@import url(@/reset.css);
</style>

<style scoped>
.wrap {
  display: flex;
}

.right {
  flex: 1;
  padding: 1rem;
}
</style>

<template>
  <ul class="skills-box">
    <skills-item />
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SkillsItem from "./SkillsItem.vue";

export default defineComponent({
  name: "SkillsBox",
  components: { SkillsItem },
  methods: {},
});
</script>

<style scoped>
.skills-box {
  display: flex;
  flex-wrap: wrap;
}
</style>

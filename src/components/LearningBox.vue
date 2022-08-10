<template>
  <ul class="learning-box">
    <learing-item />
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LearingItem from "./LearningItem.vue";

export default defineComponent({
  name: "LearningBox",
  components: { LearingItem },
  methods: {},
});
</script>

<style scoped>
.learning-box {
  display: flex;
  flex-wrap: wrap;
}
</style>

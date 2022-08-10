<template>
  <ul class="link-box">
    <link-item />
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LinkItem from "./LinkItem.vue";

export default defineComponent({
  name: "LinkBox",
  components: { LinkItem },
});
</script>

<style scoped>
.link-box {
  display: flex;
  flex-wrap: wrap;
}
</style>

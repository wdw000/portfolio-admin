<template>
  <li v-for="item in skillStore.data" :key="item.title" class="skills-item">
    <div class="item-group">
      <img :src="item.src" class="img" />
      <p class="title">{{ item.title }}</p>
    </div>
    <div class="btn-group">
      <button @click="deleteSkill(item.title)">remove</button>
    </div>
  </li>
</template>

<script lang="ts">
import { instance } from "@/main";
import { useSkillStore } from "@/store/skill";
import { mapStores } from "pinia";
import { defineComponent } from "vue";

export default defineComponent({
  name: "SkillsItem",
  created() {
    this.skillStore.getData();
  },
  computed: {
    ...mapStores(useSkillStore),
  },
  methods: {
    async deleteSkill(title: string) {
      const res = await instance.delete(`skills/${title}`);

      if (res.statusText === "OK") {
        this.skillStore.getData();
      }
    },
  },
});
</script>

<style scoped>
.skills-item {
  margin: 1rem;
  display: flex;
  align-items: center;
}

.title {
  text-align: center;
  margin-top: 0.5rem;
}
.skills-item .img {
  width: 5rem;
  background-color: white;
}

.skills-item .btn-group > button {
  margin: 0 1rem;
  padding: 0.5rem;
}
</style>

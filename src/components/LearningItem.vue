<template>
  <li
    v-for="item in learningStore.data"
    :key="item.title"
    class="learning-item"
  >
    <div class="item-group">
      <img :src="item.src" class="img" />
      <p class="title">{{ item.title }}</p>
    </div>
    <div class="btn-group">
      <button @click="deleteLearning(item.title)">remove</button>
    </div>
  </li>
</template>

<script lang="ts">
import { instance } from "@/main";
import { useLearningStore } from "@/store/learning";
import { mapStores } from "pinia";
import { defineComponent } from "vue";

export default defineComponent({
  name: "LearningItem",
  created() {
    this.learningStore.getData();
  },
  computed: {
    ...mapStores(useLearningStore),
  },
  methods: {
    async deleteLearning(title: string) {
      const res = await instance.delete(`learning/${title}`);

      if (res.statusText === "OK") {
        this.learningStore.getData();
      }
    },
  },
});
</script>

<style scoped>
.learning-item {
  margin: 1rem;
  display: flex;
  align-items: center;
}

.title {
  text-align: center;
  margin-top: 0.5rem;
}
.learning-item .img {
  width: 5rem;
  background-color: white;
}

.learning-item .btn-group > button {
  margin: 0 1rem;
  padding: 0.5rem;
}
</style>

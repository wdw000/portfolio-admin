<template>
  <li v-for="item in projectStore.data" :key="item.title" class="project-item">
    <div class="left">
      <img :src="item.imgSrc" alt="" />
      <p>{{ item.title }}</p>
    </div>

    <div class="right">
      <div class="skills">
        <p>skills</p>
        <ul>
          <li v-for="(skill, index) in item.skills" :key="index">
            {{ skill }}
          </li>
        </ul>
      </div>

      <div>
        <p>functions</p>
        <ul class="functions">
          <li v-for="(fun, index) in item.functions" :key="index">
            {{ fun }}
          </li>
        </ul>
      </div>

      <div class="link">
        <p v-if="item.git"><a :href="item.git" target="_blank">git</a></p>
        <p v-if="item.web"><a :href="item.web" target="_blank">web</a></p>
        <p><a :href="item.pdf" target="_blank">pdf</a></p>
      </div>
    </div>

    <div class="btn-group">
      <button @click="deleteProject(item.title)">remove</button>
    </div>
  </li>
</template>

<script lang="ts">
import { instance } from "@/main";
import { useProjectStore } from "@/store/project";
import { mapStores } from "pinia";
import { defineComponent } from "vue";

export default defineComponent({
  name: "ProjectItem",
  created() {
    this.projectStore.getData();
  },
  computed: {
    ...mapStores(useProjectStore),
  },
  methods: {
    async deleteProject(title: string) {
      const res = await instance.delete(`projects/${title}`);
      if (res.statusText === "OK") {
        this.projectStore.getData();
      }
    },
  },
});
</script>

<style scoped>
.project-item {
  display: flex;
  align-items: center;
  margin: 1rem;
}

.left {
  margin-right: 2rem;
}
.left > p {
  text-align: center;
}

.left > img {
  width: 10rem;
  height: 10rem;
  margin-bottom: 1rem;
}

.skills > ul {
  display: flex;
  margin: 0.5rem 0;
}

.skills li {
  margin-right: 0.5rem;
}

.functions li {
  list-style: decimal;
  margin: 0.5rem 0;
  margin-left: 1.5rem;
}

.link {
  display: flex;
}

.link > p {
  margin-right: 0.5rem;
  background-color: white;
  padding: 0.1rem;
}

.btn-group {
  margin-left: auto;
}

.btn-group > button {
  padding: 0.5rem;
}
</style>

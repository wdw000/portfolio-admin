<template>
  <nav class="nav-box">
    <h1>Portfolio Admin</h1>
    <ul>
      <li @click="handleListClick" :class="{ on: nav === 'Skills' }">Skills</li>
      <li @click="handleListClick" :class="{ on: nav === 'Learning' }">
        Learning
      </li>
      <li @click="handleListClick" :class="{ on: nav === 'Link' }">Link</li>
      <li @click="handleListClick" :class="{ on: nav === 'Project' }">
        Project
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapStores } from "pinia";
import { useNavStore } from "@/store/nav";

export default defineComponent({
  name: "NavBox",
  data() {
    return {
      nav: "",
    };
  },
  created() {
    this.nav = this.navStore.navState;
  },
  computed: {
    ...mapStores(useNavStore),
  },
  methods: {
    handleListClick(event: Event) {
      const listValue = event.target as HTMLLIElement;
      this.navStore.setNavState(listValue.innerText);
      this.nav = listValue.innerText;
    },
  },
});
</script>

<style scoped>
.nav-box {
  height: 100vh;
  border-right: solid #ddd 0.1rem;
  padding: 1rem;
  position: sticky;
  top: 0;
}

.nav-box > h1 {
  font-size: 1.2rem;
  font-weight: bold;
}

.nav-box > ul > li {
  margin: 1rem 0;
}
.on {
  font-weight: bold;
}
</style>

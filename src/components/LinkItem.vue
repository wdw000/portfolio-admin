<template>
  <li v-for="item in linkStore.data" :key="item.title" class="link-item">
    <div class="item-box">
      <img :src="item.imgSrc" />
      <p>{{ item.title }}</p>
      <p>{{ item.imgURL }}</p>
    </div>
    <div class="btn-group">
      <button @click="deleteLink(item.title)">remove</button>
    </div>
  </li>
</template>

<script lang="ts">
import { instance } from "@/main";
import { useLinkStore } from "@/store/link";
import { mapStores } from "pinia";
import { defineComponent } from "vue";

export default defineComponent({
  name: "LinkItem",
  created() {
    this.linkStore.getData();
  },
  computed: {
    ...mapStores(useLinkStore),
  },
  methods: {
    async deleteLink(title: string) {
      const res = await instance.delete(`link/${title}`);

      if (res.statusText === "OK") {
        this.linkStore.getData();
      }
    },
  },
});
</script>

<style scoped>
.link-item {
  display: flex;
  align-items: center;
  margin: 1rem;
}

.item-box {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.item-box > p {
  text-align: center;
  margin-top: 0.5rem;
}

.item-box > img {
  width: 5rem;
  background-color: white;
}

.btn-group > button {
  margin: 0 1rem;
  padding: 0.5rem;
}
</style>

import { defineStore } from "pinia";
import { instance } from "@/main";

export interface LearningData {
  title: string;
  src: string;
}

export const useLearningStore = defineStore("learning", {
  state: () => {
    return {
      data: [] as LearningData[],
    };
  },

  actions: {
    async getData() {
      const res = await instance.get("learning");

      if (res.statusText === "OK") {
        this.data = res.data;
      }
    },
  },
});

import { instance } from "@/main";
import { defineStore } from "pinia";

export interface SkillData {
  title: string;
  src: string;
}

export const useSkillStore = defineStore("skill", {
  state: () => {
    return {
      data: [] as SkillData[],
    };
  },
  actions: {
    async getData() {
      const res = await instance.get("skills");

      if (res.statusText === "OK") {
        this.data = res.data;
      }
    },
  },
});

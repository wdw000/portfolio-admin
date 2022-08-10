import { instance } from "@/main";
import { defineStore } from "pinia";

export interface ProjectData {
  title: string;
  imgSrc: string;
  skills: string[];
  functions: string[];
  git: string | null;
  web: string | null;
  pdf: string;
}

export const useProjectStore = defineStore("project", {
  state: () => {
    return {
      data: [] as ProjectData[],
    };
  },

  actions: {
    async getData() {
      const res = await instance.get("projects");

      if (res.statusText === "OK") {
        const data = res.data;
        for (const item of data) {
          item.skills = JSON.parse(item.skills);
          item.functions = JSON.parse(item.functions);
        }

        this.data = data;
      }
    },
  },
});

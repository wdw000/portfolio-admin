import { instance } from "@/main";
import { defineStore } from "pinia";

export interface LinkData {
  title: string;
  imgURL: string;
  imgSrc: string;
}

export const useLinkStore = defineStore("link", {
  state: () => {
    return {
      data: [] as LinkData[],
    };
  },

  actions: {
    async getData() {
      const res = await instance.get("link");

      if (res.statusText === "OK") {
        this.data = res.data;
      }
    },
  },
});

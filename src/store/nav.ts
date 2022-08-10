import { defineStore } from "pinia";

export const useNavStore = defineStore("nav", {
  state: () => {
    return {
      navState: "Skills",
    };
  },

  actions: {
    setNavState(type: string) {
      this.navState = type;
    },
  },
});

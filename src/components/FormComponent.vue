<template>
  <div class="form-component">
    <h2>{{ navStore.navState }}</h2>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          v-model.trim.lazy="title"
          required
        />
      </div>

      <div v-if="navStore.navState === 'Link'">
        <label for="img-url">IMG URL</label>
        <input type="url" name="url" id="img-url" v-model.trim.lazy="imgUrl" />
      </div>

      <div>
        <label for="img">Img</label>
        <input type="file" name="images" id="img" ref="img" multiple required />
      </div>

      <div v-if="navStore.navState === 'Project'" class="check">
        <label for="skills">Skills</label>
        <div>
          <div
            v-for="item in skillStore.data"
            :key="item.title"
            class="skill-box"
          >
            <label :for="item.title">{{ item.title }}</label>
            <input
              type="checkbox"
              name="skills"
              :id="item.title"
              @change="handelSkillItem"
            />
          </div>
        </div>
      </div>

      <div v-if="navStore.navState === 'Project'">
        <label for="functions">Functions</label>
        <div>
          <input
            type="text"
            name="functions"
            id="functions"
            v-model.trim.lazy="fun"
          />
          <button type="button" @click="handleFunAdd">Add</button>
        </div>
      </div>

      <div v-if="navStore.navState === 'Project'" class="functions">
        <div></div>
        <div>
          <span v-if="functions.length === 0">Please input functions</span>
          <ul v-else>
            <li v-for="(fun, index) in functions" :key="index">
              <span>{{ fun }}</span>
              <button type="button" @click="handleFunRemove(fun)">
                remove
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div v-if="navStore.navState === 'Project'" class="check">
        <label>Link</label>

        <div>
          <label for="git">GIT</label>
          <input
            type="checkbox"
            name="link"
            id="git"
            :checked="git"
            @change="handleCheckBox"
          />
          <label for="web">WEB</label>
          <input
            type="checkbox"
            name="link"
            id="web"
            :checked="web"
            @change="handleCheckBox"
          />
          <label for="pdf">PDF</label>
          <input
            type="checkbox"
            name="link"
            id="pdf"
            :checked="pdf"
            @change="handleCheckBox"
          />
        </div>
      </div>

      <div v-if="navStore.navState === 'Project' && git">
        <label for="git-url">GIT</label>
        <input
          type="url"
          name="link"
          id="git-url"
          required
          v-model.trim.lazy="gitUrl"
        />
      </div>

      <div v-if="navStore.navState === 'Project' && web">
        <label for="web-url">WEB</label>
        <input
          type="url"
          name="link"
          id="web-url"
          required
          v-model.trim.lazy="webUrl"
        />
      </div>

      <div v-if="navStore.navState === 'Project' && pdf">
        <label for="pdf-url">PDF</label>
        <input type="file" name="link" id="pdf-url" ref="pdf" required />
      </div>

      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script lang="ts">
import { useNavStore } from "@/store/nav";
import { mapStores } from "pinia";
import { defineComponent } from "vue";
import { instance } from "@/main";
import { useSkillStore } from "@/store/skill";
import { useLearningStore } from "@/store/learning";
import { useLinkStore } from "@/store/link";
import { useProjectStore } from "@/store/project";

export default defineComponent({
  name: "FormComponent",
  data() {
    return {
      title: "",
      imgUrl: "",
      git: true,
      web: true,
      pdf: true,
      gitUrl: "",
      webUrl: "",
      skills: [] as string[],
      functions: [] as string[],
      fun: "",
    };
  },
  computed: {
    ...mapStores(
      useNavStore,
      useSkillStore,
      useLearningStore,
      useLinkStore,
      useProjectStore
    ),
  },
  methods: {
    async handleSubmit() {
      switch (this.navStore.navState) {
        case "Skills":
          this.skillSubmit();
          break;

        case "Learning":
          this.learningSubmit();
          break;

        case "Link":
          this.linkSubmit();
          break;

        case "Project":
          this.projectSubmit();
          break;
      }
    },

    async skillSubmit() {
      const inputImg = this.$refs.img as HTMLInputElement;
      const formData = new FormData();

      if (inputImg.files) {
        for (const file of inputImg.files) {
          formData.append("images", file);
        }
      }

      formData.append("title", this.title);

      const res = await instance.post("skills", formData);

      if (res.status === 201) {
        console.log("post skills success");
        console.log(res.data);
        this.title = "";
        inputImg.value = "";
        this.skillStore.getData();
      } else {
        console.log("post skills fail");
      }
    },

    async learningSubmit() {
      const inputImg = this.$refs.img as HTMLInputElement;
      const formData = new FormData();

      if (inputImg.files) {
        for (const file of inputImg.files) {
          formData.append("images", file);
        }
      }

      formData.append("title", this.title);

      const res = await instance.post("learning", formData);

      if (res.status === 201) {
        console.log("post learning success");
        console.log(res.data);
        this.title = "";
        inputImg.value = "";
        this.learningStore.getData();
      } else {
        console.log("post learning fail");
      }
    },

    async linkSubmit() {
      const inputImg = this.$refs.img as HTMLInputElement;
      const formData = new FormData();

      if (inputImg.files) {
        for (const file of inputImg.files) {
          formData.append("images", file);
        }
      }

      formData.append("title", this.title);
      formData.append("imgURL", this.imgUrl);

      const res = await instance.post("link", formData);

      if (res.status === 201) {
        console.group("post link success");
        console.log(res.data);
        this.title = "";
        this.imgUrl = "";
        inputImg.value = "";
        this.linkStore.getData();
      } else {
        console.log("post link fail");
      }
    },

    async projectSubmit() {
      const inputImg = this.$refs.img as HTMLInputElement;
      const inputPdf = this.$refs.pdf as HTMLInputElement;
      const formData = new FormData();

      if (inputImg.files) {
        for (const file of inputImg.files) {
          formData.append("images", file);
        }
      }

      if (inputPdf.files) {
        for (const file of inputPdf.files) {
          formData.append("pdf", file);
        }
      }

      formData.append("title", this.title);
      for (const skill of this.skills) {
        formData.append("skills", skill);
      }
      for (const fun in this.functions) {
        formData.append("functions", this.functions[fun]);
      }
      formData.append("git", this.gitUrl);
      formData.append("web", this.webUrl);

      const res = await instance.post("projects", formData);

      if (res.statusText === "Created") {
        console.log("post projects success");

        this.title = "";
        this.imgUrl = "";
        this.skills = [];
        this.fun = "";
        this.functions = [];
        this.git = true;
        this.web = true;
        this.pdf = true;
        this.gitUrl = "";
        this.webUrl = "";
        this.projectStore.getData();
      } else {
        console.log("post projects fail");
      }
    },

    handleCheckBox(e: Event) {
      const target = e.target as HTMLInputElement;

      switch (target.id) {
        case "git":
          this.git = !this.git;
          break;
        case "web":
          this.web = !this.web;
          break;
        case "pdf":
          this.pdf = !this.pdf;
          break;
      }
    },

    handleFunAdd() {
      this.functions.push(this.fun);
      this.fun = "";
    },

    handleFunRemove(value: string) {
      const idx = this.functions.indexOf(value);
      this.functions.splice(idx, 1);
    },

    handelSkillItem(e: Event) {
      const target = e.target as HTMLInputElement;

      if (target.checked) {
        this.skills.push(target.id);
      } else {
        const idx = this.skills.findIndex((item) => item === target.id);
        this.skills.splice(idx, 1);
      }
    },
  },
});
</script>

<style scoped>
.form-component > h2 {
  margin-bottom: 1rem;
  font-weight: bold;
  font-size: 1.2rem;
}

.form-component .check {
  display: flex;
  margin-bottom: 0.5rem;
  align-items: center;
}

.form-component .check > label {
  flex: 1;
}

.form-component .check > div {
  flex: 8;
  display: flex;
  flex-wrap: wrap;
}

.form-component .check > div > div {
  margin: 1rem;
}

.form-component .check > div > input {
  margin-right: 0.5rem;
}

.form-component > form > div:not([class~="check"]) {
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
}

.form-component > form > div:not([class~="check"]) > div {
  flex: 8;
  display: flex;
}

.form-component > form > div:not([class~="check"]) > div > button {
  border-left: solid #ddd 0.1rem;
  padding: 0 0.5rem;
}

.form-component > form > div:not([class~="check"]) > div > input {
  flex: 1;
}

.form-component > form > div:not([class~="check"]) > button {
  padding: 0.5rem;
  border-left: solid 0.1rem #ddd;
}

.form-component > form > div:not([class~="check"]) > label {
  flex: 1;
}

.form-component > form > div:not([class~="check"]) > input {
  flex: 8;
}

.form-component > form > button {
  margin-left: auto;
  display: flex;
  margin-top: 1rem;
  padding: 0.5rem 1rem;
}

.form-component .functions {
  display: flex;
  align-items: center;
}

.form-component .functions > div:first-child {
  flex: 1;
}

.form-component .functions > div:first-child + div {
  border-top: solid 1px #ddd;
}

.form-component .functions > div {
  padding: 0.5rem 0;
}

.form-component .functions > div > ul {
  margin-left: 2rem;
  width: 100%;
}

.form-component .functions > div > ul > li {
  list-style: decimal;
  width: 100%;
}

.form-component .functions > div > ul > li:not(:last-child) {
  margin-bottom: 1rem;
}

.form-component .functions > div > ul > li > button {
  float: right;
}
</style>

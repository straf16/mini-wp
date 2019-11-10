<template>
  <div>
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
          <div class="navbar-item" style="margin: 5px 20px;">
            <a @click="go('home')">Close</a>
          </div>
          <p class="navbar-item">
            <i class="far fa-window-maximize"></i>
            &nbsp; {{name}}
          </p>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <a class="button is-info" @click="publishArticle">Publish...</a>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <div class="container" style="margin-top: 30px;">
      <b-field>
        <b-input v-model="title" size="is-large" required placeholder="Title"></b-input>
      </b-field>
      <div class="container" id="imagedrop">
        <b-upload v-model="featured_image" multiple drag-drop>
          <section class="section">
            <div class="content has-text-centered">
              <p>
                <b-icon icon="upload" size="is-large"></b-icon>
              </p>
              <p>Drop your image here or click to upload</p>
              <div class="tags">
                <span v-if="featured_image != null" class="tag is-primary">
                  {{featured_image[0].name}}
                  <button
                    class="delete is-small"
                    type="button"
                    @click="deleteDropFile(index)"
                  ></button>
                </span>
              </div>
            </div>
          </section>
        </b-upload>
      </div>
      <quill-editor
        v-model="content"
        required
        :options="config"
        ref="myQuillEditor"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @ready="onEditorReady($event)"
      ></quill-editor>
      <b-field>
        <b-taginput v-model="tags" ellipsis icon="label" placeholder="Add a tag"></b-taginput>
      </b-field>
    </div>
  </div>
</template>

<script>
import axios from "../../config/myaxios";
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

export default {
  name: "CreateArticle",
  props: {
    name: String
  },
  data() {
    return {
      title: "",
      content: "",
      tags: [],
      featured_image: null,
      config: {
        modules: {
          toolbar: {
            container: [
              [{ size: ["small", false, "large", "huge"] }], // custom dropdown
              [{ header: [1, 2, 3, 4, 5, 6, false] }],

              ["bold", "italic", "underline", "strike"], // toggled buttons
              [{ list: "ordered" }, { list: "bullet" }],

              ["link", "blockquote", "code-block"],
              [{ align: [] }],
              [{ indent: "-1" }, { indent: "+1" }], // outdent/indent

              [{ color: [] }, { background: [] }], // dropdown with defaults from theme
              [{ font: [] }]
            ]
          }
        },
        theme: "snow"
      }
    };
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  },
  components: {
    quillEditor
  },
  methods: {
    go(page) {
      this.$emit("go", page);
    },
    onEditorBlur(quill) {
      console.log("editor blur!", quill);
    },
    onEditorFocus(quill) {
      console.log("editor focus!", quill);
    },
    onEditorReady(quill) {
      console.log("editor ready!", quill);
    },
    onEditorChange({ quill, html, text }) {
      console.log("editor change!", quill, html, text);
      this.content = html;
    },
    publishArticle() {
      const loading = this.$buefy.loading.open();
      const formData = new FormData();
      formData.append("title", this.title);
      formData.append("content", this.content);
      formData.append("tags", this.tags);
      formData.append("featured_image", this.featured_image[0]);
      axios({
        method: "POST",
        url: "/articles",
        headers: {
          token: localStorage.getItem("token")
        },
        data: formData
      })
        .then(({ data }) => {
          console.log(data);
          this.go("home");
          this.$buefy.notification.open({
            message: "Succesfully create article",
            type: "is-success",
            hasIcon: true
          });
        })
        .catch(err => {
          console.log(err);
          this.$buefy.notification.open({
            message: "please upload a picture for article cover",
            type: "is-danger",
            hasIcon: true
          });
        })
        .finally(() => loading.close());
    },
    deleteDropFile(index) {
      this.featured_image.splice(index, 1);
    }
  }
};
</script>

<style>
.ql-container {
  min-height: 200px;
  margin-bottom: 10px;
}
.dropzone {
  min-width: 85vw;
}
#imagedrop {
  display: flex;
  justify-content: center;
  margin-top: 5px;
  margin-bottom: 10px;
}
</style>

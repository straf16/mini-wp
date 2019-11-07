<template>
  <div>
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
          <div class="navbar-item" style="margin: 5px 20px;">
            <a @click="go('home')">Close</a>
          </div>
          <p class="navbar-item">
            <i class="far fa-window-maximize"></i>&nbsp; Ahmad Fadilah
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
        <b-input v-model="title" size="is-large" placeholder="Title"></b-input>
      </b-field>
      <div class="custom-file" style="display: none;">
        <input
          ref="image"
          @change="imageUpload($event)"
          type="file"
          class="custom-file-input"
          id="imageUpload"
          aria-describedby="imageUploadAddon"
        />
        <label class="custom-file-label" for="imageUpload">Choose file</label>
      </div>
      <quill-editor
        v-model="content"
        :options="config"
        ref="myQuillEditor"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @ready="onEditorReady($event)"
      ></quill-editor>
      <b-field>
        <b-taginput
          v-model="tags"
          :data="filteredTags"
          autocomplete
          icon="label"
          placeholder="Add a tag"
          @typing="getFilteredTags"
        ></b-taginput>
      </b-field>
    </div>
  </div>
</template>

<script>
import axios from "../../config/myaxios";
import Quill from "quill";
import { quillEditor } from "vue-quill-editor";
// import { ImageResize } from "quill-image-resize";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

// Register ImageResize module
// Quill.register("modules/imageResize", ImageResize);

const tagsArray = [
  "Angular",
  "Angular 2",
  "Aurelia",
  "Backbone",
  "Ember",
  "jQuery",
  "Meteor",
  "Node.js",
  "Polymer",
  "React",
  "RxJS",
  "Vue.js"
];

export default {
  data() {
    return {
      title: "",
      content: "",
      tags: [],
      images: [],
      filteredTags: tagsArray,
      config: {
        modules: {
          // ImageResize: {
          //   modules: ["Resize", "DisplaySize", "Toolbar"]
          // },
          toolbar: {
            container: [
              ["bold", "italic", "underline", "strike"], // toggled buttons
              ["link", "blockquote", "code-block", "image"],

              [{ header: 1 }, { header: 2 }], // custom button values
              [{ list: "ordered" }, { list: "bullet" }],
              [{ script: "sub" }, { script: "super" }], // superscript/subscript
              [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
              [{ direction: "rtl" }], // text direction

              [{ size: ["small", false, "large", "huge"] }], // custom dropdown
              [{ header: [1, 2, 3, 4, 5, 6, false] }],

              [{ color: [] }, { background: [] }], // dropdown with defaults from theme
              [{ font: [] }],
              [{ align: [] }],

              ["clean"] // remove formatting button
            ],
            handlers: {
              // handlers object will be merged with default handlers object
              image: function(value) {
                if (value) {
                  document.querySelector("#imageUpload").click();
                } else {
                  this.quill.format("image", false);
                }
              }
            }
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
      axios({
        method: "POST",
        url: "/articles",
        headers: {
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGMxNzUxNDIwOTZmMTE2NzYxZjY0MDciLCJuYW1lIjoiRmFkaWxhaCIsImVtYWlsIjoiZmFkaWxAbWFpbC5jb20iLCJpYXQiOjE1NzI5NjUyMTJ9.Jf3RYh5quLB9oJ-f-AbEEk9cTYN4m-EM7MpLv5rqvss"
        },
        data: {
          title: this.title,
          desc: this.content,
          tags: this.tags
        }
      })
        .then(({ data }) => {
          console.log(data);
          this.go("home");
          this.$buefy.notification.open({
            message: "Succesfully create article",
            type: "is-success"
          });
        })
        .catch(err => console.log(err));
    },
    getFilteredTags(text) {
      this.filteredTags = tagsArray.filter(option => {
        return (
          option
            .toString()
            .toLowerCase()
            .indexOf(text.toLowerCase()) >= 0
        );
      });
    },
    imageUpload(e) {
      if (e.target.files.length !== 0) {
        let quill = this.editor;
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        let self = this;
        reader.onloadend = function() {
          let base64data = reader.result;
          self.images.push(base64data);
          console.log("ini base64data", base64data);

          // Get cursor location
          let length = quill.getSelection().index;

          // Insert image at cursor location
          quill.insertEmbed(length, "image", base64data);

          // Set cursor to the end
          quill.setSelection(length + 1);
        };
      }
    }
  }
};
</script>

<style>
.ql-container {
  min-height: 350px;
  margin-bottom: 10px;
}
</style>

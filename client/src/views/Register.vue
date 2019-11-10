<template>
  <div class="register">
    <div>
      <div id="register-container" class="container" style>
        <div style="font-size: 30px; margin-bottom: 13px;">Lets get started</div>
        <div class="columns">
          <div class="column" style="display: flex; justify-content: center;">
            <div class="card">
              <div class="card-content">
                <section>
                  <form style="margin: 15px 0; text-align: left;" @submit="register">
                    <b-field label="Full Name">
                      <b-input v-model="name"></b-input>
                    </b-field>
                    <b-field label="Email Address">
                      <b-input v-model="email" type="email"></b-input>
                    </b-field>
                    <b-field label="Password">
                      <b-input v-model="password" type="password" password-reveal></b-input>
                    </b-field>
                    <input
                      type="submit"
                      value="Create account"
                      class="button is-danger"
                      style="width: 100%; margin: 5px 0;"
                    />
                  </form>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- END LOGIN -->
    </div>
  </div>
</template>

<script>
import axios from "../../config/myaxios";

export default {
  name: "Register",
  data() {
    return {
      name: "",
      email: "",
      password: ""
    };
  },
  methods: {
    go(page) {
      // console.log("di navbar kirim", page);
      this.$emit("go", page);
    },
    register() {
      axios({
        method: "POST",
        url: "/users/register",
        data: {
          name: this.name,
          email: this.email,
          password: this.password
        }
      })
        .then(({ data }) => {
          this.name = "";
          this.email = "";
          this.password = "";
          this.$buefy.notification.open({
            message: "Success create account, login to continue",
            type: "is-success",
            hasIcon: true
          });
          this.go("login");
        })
        .catch(({ response }) => {
          response.data.message.forEach(error => {
            this.$buefy.notification.open({
              message: error,
              type: "is-danger",
              hasIcon: true
            });
          });
        });
    }
  }
};
</script>

<style scoped>
.register {
  display: flex;
  justify-content: center;
  padding: 0 50px;
  flex-direction: column;
  padding: 60px;
}
#register-container {
  margin-top: 20px;
  width: 120vh;
  text-align: center;
}
.card {
  margin: 40px;
  width: 30vw;
}
</style>
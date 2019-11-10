<template>
  <div class="login">
    <div>
      <div id="login-container" class="container" style>
        <div style="font-size: 30px; margin-bottom: 13px;">Log In to your account</div>
        <div class="columns">
          <div class="column" style="display: flex; justify-content: center;">
            <div class="card">
              <div class="card-content">
                <section>
                  <form style="margin: 15px 0; text-align: left;" @submit="login">
                    <b-field label="Email Address">
                      <b-input v-model="email" type="email"></b-input>
                    </b-field>

                    <b-field label="Password">
                      <b-input v-model="password" type="password" password-reveal></b-input>
                    </b-field>
                    <input
                      type="submit"
                      value="Login"
                      class="button is-danger"
                      style="width: 100%; margin: 5px 0;"
                    />
                  </form>
                  <g-signin-button
                    :params="googleSignInParams"
                    class="button"
                    style="width: 100%; margin: 5px 0;"
                    @success="onSignInSuccess"
                    @error="onSignInError"
                  >
                    <i class="fab fa-google"></i>&nbsp;Log in with Google
                  </g-signin-button>
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
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      googleSignInParams: {
        client_id:
          "73466446457-o33l3k8s3dpakj1ekpsiuf6c0ibqonf1.apps.googleusercontent.com"
      }
    };
  },
  methods: {
    go(page) {
      // console.log("di navbar kirim", page);
      this.$emit("go", page);
    },
    changeLogin(value) {
      // console.log("di navbar kirim", page);
      this.$emit("change-login", value);
    },
    login() {
      axios({
        method: "POST",
        url: "/users/login",
        data: {
          email: this.email,
          password: this.password
        }
      })
        .then(({ data }) => {
          localStorage.setItem("email", data.email);
          localStorage.setItem("name", data.name);
          localStorage.setItem("token", data.token);
          this.email = "";
          this.password = "";
          this.$buefy.notification.open({
            message: "Succesfully Login",
            type: "is-success",
            hasIcon: true
          });
          this.go("home");
          this.changeLogin(true);
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
    },
    onSignInSuccess(googleUser) {
      // `googleUser` is the GoogleUser object that represents the just-signed-in user.
      // See https://developers.google.com/identity/sign-in/web/reference#users
      const id_token = googleUser.getAuthResponse().id_token;
      axios({
        method: "POST",
        url: "/users/googleSignIn",
        data: {
          id_token
        }
      })
        .then(({ data }) => {
          console.log(data);
          this.email = "";
          this.password = "";
          this.$buefy.notification.open({
            message: "Succesfully Login",
            type: "is-success",
            hasIcon: true
          });
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
    },
    onSignInError(error) {
      // `error` contains any error occurred.
      console.log("OH NOES", error);
      this.$buefy.notification.open({
        message: "google login canceled",
        type: "is-danger",
        hasIcon: true
      });
    }
  }
};
</script>

<style scoped>
.login {
  display: flex;
  justify-content: center;
  padding: 0 50px;
  flex-direction: column;
  padding: 60px;
}
#login-container {
  margin-top: 20px;
  width: 120vh;
  text-align: center;
}
.card {
  margin: 40px;
  width: 30vw;
}
</style>
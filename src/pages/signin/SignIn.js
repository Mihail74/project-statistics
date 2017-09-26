import SignInTab from "./SignInTab.vue";
import RegisterTab from "./RegisterTab.vue";

export default {
  name: "signin",

  components: {
    SignInTab,
    RegisterTab
  },

  methods: {
    successfulRegistered(credentials) {
      console.log(credentials);
      //TODO: залогиниться. Переименовать метод, ну и из SignInTab тоже сюда ходить
    }
  }
}

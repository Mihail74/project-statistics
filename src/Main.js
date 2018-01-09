// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App.vue";
import store from "@/store";
import router from "./router";
import VueMaterial from "vue-material";
import VeeValidate from 'vee-validate';

import "vue-material/dist/vue-material.css";

Vue.config.productionTip = false;

Vue.use(VueMaterial);
Vue.use(VeeValidate, {
    locale: 'ru',
    dictionary: {
        ru: {
            messages: {
                required: () => 'Поле обязательно для заполнения',
                numeric: () => 'Поле должно быть числом',
                required: () => 'Поле обязательно для заполнения',
                required: () => 'Поле обязательно для заполнения'
            }
        }
        //   en: { attributes: attributesEn },
        //   ar: { messages: messagesAr, attributes: attributesAr }
    }
});

Vue.material.registerTheme("default", {
    primary: "teal",
    accent: {
        color: "red",
        hue: 900,
    },
    warn: "red",
    background: "white"
});

/* eslint-disable no-new */
new Vue({
    el: "#app",
    store,
    router,
    template: "<App/>",
    components: {
        App
    }
});

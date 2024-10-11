import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import { createVuetify } from "vuetify";

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    defaults: {
      VTextField: {
        variant: "outlined",
        density: "compact",
      },
      VTextarea: {
        variant: "outlined",
        density: "compact",
      },
      VFileInput: {
        variant: "outlined",
        density: "compact",
      },
      VBtn: {
        color: "primary",
      },
      VSelect: {
        density: "compact",
        variant: "outlined",
      },
    },
  });
  app.vueApp.use(vuetify);
});

// import { deepMerge } from "@antfu/utils";
// import { useI18n } from "vue-i18n";
// import { createVueI18nAdapter } from "vuetify/locale/adapters/vue-i18n";
// import { getI18n } from "@/plugins/i18n/index";
import { createVuetify } from "vuetify";
import defaults from "./defaults";
import { staticPrimaryColor, staticPrimaryDarkenColor, themes } from "./theme";
import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";
import { resolveVuetifyTheme } from "../../utils/resolveVeutifyTheme";

export default defineNuxtPlugin((nuxtApp) => {
  const appConfig = useAppConfig();
  const storedTheme = useCookie("theme");

  const cookieThemeValues = {
    defaultTheme: resolveVuetifyTheme(appConfig.theme, storedTheme),
    themes: {
      light: {
        colors: {
          primary: staticPrimaryColor,
          "primary-darken-1": staticPrimaryDarkenColor,
        },
      },
      dark: {
        colors: {
          primary: staticPrimaryColor,
          "primary-darken-1": staticPrimaryDarkenColor,
        },
      },
    },
  };

  const vuetify = createVuetify({
    ssr: true,
    defaults,
    theme: {
      defaultTheme: resolveVuetifyTheme(appConfig.theme, storedTheme),
      themes,
    },
    // locale: {
    //   adapter: createVueI18nAdapter({ i18n: getI18n(), useI18n }),
    // },
  });

  nuxtApp.vueApp.use(vuetify);
});

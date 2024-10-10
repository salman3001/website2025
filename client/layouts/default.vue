<script setup lang="ts">
import AuthMenu from "~/components/auth-menu.vue";
import { NavMenus } from "~/utils/constants/nav-menus";

const drawer = ref(false);
const sideMenuGroups = ref([]);
</script>

<template>
  <v-layout>
    <v-app-bar color="primary" prominent density="compact" class="pr-2">
      <v-app-bar-nav-icon
        variant="text"
        @click.stop="drawer = !drawer"
        v-if="$vuetify.display.smAndDown"
      ></v-app-bar-nav-icon>

      <v-toolbar-title>My files</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-row
        style="max-width: max-content"
        class="px-2"
        no-gutters
        v-if="$vuetify.display.mdAndUp"
      >
        <v-col v-for="(menu, i) in NavMenus">
          <v-menu open-on-hover v-if="menu.child">
            <template v-slot:activator="{ props }">
              <v-btn v-bind="props" append-icon="mdi-chevron-down">
                {{ menu.name }}
              </v-btn>
            </template>

            <v-list density="compact">
              <v-list-item
                v-for="(subMenu, index) in menu.child"
                :key="index"
                :to="subMenu.href"
                nuxt
              >
                <v-list-item-title>{{ subMenu.name }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <v-btn v-else :to="menu.href" nuxt>{{ menu.name }}</v-btn>
        </v-col>
      </v-row>

      <template v-if="$vuetify.display.mdAndUp">
        <v-btn icon="mdi-magnify" variant="text"></v-btn>
      </template>
      <AuthMenu />
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" temporary>
      <v-list v-model:opened="sideMenuGroups">
        <template v-for="(menu, i) in NavMenus" :key="i">
          <v-list-group v-if="menu.child" :value="menu.name">
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props" :title="menu.name" />
            </template>
            <v-list-item
              v-for="subMenu in menu.child"
              :title="subMenu.name"
              :to="subMenu.href"
              nuxt
            />
          </v-list-group>

          <v-list-item v-else :to="menu.href" nuxt>{{ menu.name }}</v-list-item>
        </template>
        <!-- <v-list-group value="User">
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" title="User" />
          </template>
          <v-list-item
            v-for="menu in AuthMenuItems"
            :title="menu.name"
            :to="menu.href"
            nuxt
          />
        </v-list-group> -->
      </v-list>
    </v-navigation-drawer>

    <v-main style="height: 500px">
      <slot />
    </v-main>
  </v-layout>
</template>

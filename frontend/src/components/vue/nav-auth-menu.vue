<script setup lang="ts">
import { $authStore, setAuth } from "src/scripts/stores/authStore";
import { routes } from "../../utils/routes";
import { useStore } from "@nanostores/vue";
import { navigate } from "astro:transitions/client";

const authData = useStore($authStore);
</script>

<template>
  <div v-show="authData?.user" class="dropdown dropdown-end">
    <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
      <div class="w-10 rounded-full">
        <img
          alt="Tailwind CSS Navbar component"
          src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
        />
      </div>
    </div>
    <ul
      tabindex="0"
      class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
    >
      <li>
        <a class="justify-between">
          Profile
          <span class="badge">New</span>
        </a>
      </li>
      <li><a>Settings</a></li>
      <li>
        <a
          @click.prevent="
            () => {
              setAuth(null);
              navigate(routes.web.home());
            }
          "
          >Logout</a
        >
      </li>
    </ul>
  </div>
  <a :href="routes.auth.signin()" v-show="!authData?.user">
    <button data-guest class="btn btn-sm btn-primary">Login</button>
  </a>
</template>

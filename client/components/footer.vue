<script setup lang="ts">
const links = ["Home", "About Us", "Team", "Services", "Blog", "Contact Us"];
</script>

<template>
  <v-footer class="bg-grey-lighten-1 pa-5">
    <v-row justify="center">
      <v-col class="d-flex flex-column" cols="6" sm="4" md="3">
        <h6 class="footer-title text-h6">Services</h6>
        <a>Branding</a>
        <a>Design</a>
        <a>Marketing</a>
        <a>Advertisement</a>
      </v-col>
      <v-col class="d-flex flex-column" cols="6" sm="4" md="3">
        <h6 class="footer-title text-h6">Company</h6>
        <a>About us</a>
        <a>Contact</a>
        <a>Jobs</a>
        <a>Press kit</a>
      </v-col>
      <v-col class="d-flex flex-column" cols="6" sm="4" md="3">
        <h6 class="footer-title text-h6">Legal</h6>
        <a>Terms of use</a>
        <a>Privacy policy</a>
        <a>Cookie policy</a>
      </v-col>
      <v-col cols="6" sm="4" md="3">
        <h6 class="footer-title text-h6">Newsletter</h6>
        <v-text-field
          placeholder="Subscribe "
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
        >
          <template #append-inner>
            <v-btn icon="mdi-send" size="small" variant="text"></v-btn>
          </template>
        </v-text-field>
      </v-col>
      <v-divider></v-divider>
      <div class="text-grey-darken-2 pt-1">
        {{ new Date().getFullYear() }} —
        <strong>{{ $config.public.appName }}</strong>
      </div>
    </v-row>
  </v-footer>
</template>

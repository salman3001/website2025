<script setup lang="ts">
import type { BlogComment, DiscussionComment } from "~/utils/types/modals";

const showReplies = ref(false);

defineProps<{
  comment: BlogComment | DiscussionComment;
  blogSlug?: string;
  discussionSlug?: string;
}>();
</script>
<template>
  <v-card
    class="bg-background"
    border="none"
    style="min-width: 200px"
    :style="{ overflow: $vuetify.display.mdAndDown ? 'scroll' : 'auto' }"
  >
    <VCardItem>
      <div class="d-flex ga-4">
        <div>
          <VAvatar
            image="https://cdn.vuetifyjs.com/images/john.jpg"
            rounded="lg"
            size="64"
          >
          </VAvatar>
        </div>
        <div>
          <div>{{ comment.user.fullName }}</div>
          <div class="text-caption">
            Commented on
            {{ new Date(comment.user.createdAt).toLocaleDateString() }}
          </div>
        </div>
      </div>
    </VCardItem>
    <VCardText class="text-body-1">
      {{ comment.message }}
    </VCardText>
    <VCardActions class="mx-2">
      <v-btn
        prepend-icon="mdi-heart"
        color="primary"
        variant="tonal"
        size="small"
      >
        5
      </v-btn>
      <v-btn
        prepend-icon="mdi-message"
        color="primary"
        variant="tonal"
        size="small"
        @click="() => (showReplies = !showReplies)"
      >
        {{ comment?._count?.replies }}
      </v-btn>
      <v-btn
        color="primary"
        variant="text"
        size="small"
        @click="() => (showReplies = !showReplies)"
      >
        View
      </v-btn>
    </VCardActions>
  </v-card>
  <div v-if="showReplies" class="ml-5 border-s-md">
    <div class="mt-2 py-2 pl-5">
      <ListsComments
        type="blog"
        :blog-slug="blogSlug"
        :discussion-slug="discussionSlug"
        :parent-id="comment.id"
        :with-reply-form="true"
      />
    </div>
  </div>
</template>

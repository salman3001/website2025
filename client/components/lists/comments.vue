<script setup lang="ts">
import type { IResType } from "~/utils/types";
import type { BlogComment, DiscussionComment } from "~/utils/types/modals";

const props = defineProps<{
  type: "blog" | "discussion";
  blogSlug?: string;
  discussionSlug?: string;
  parentId?: number;
  withReplyForm?: boolean;
}>();

const { data, status, refresh } = await useFetcherGet<
  IResType<{ count: number; data: BlogComment[] | DiscussionComment[] }>
>(
  props.type === "blog"
    ? apiRoutes.blogComments.index()
    : apiRoutes.discussionComments.index(),
  {
    query: {
      select: [
        "id",
        "message",
        "createdAt",
        "user",
        "parentId",
        "count:replies",
      ],
      take: 1000,
      skip: 0,
      orderBy: "createdAt:desc",
      ...(props.blogSlug ? { blogSlug: props.blogSlug } : {}),
      ...(props.discussionSlug ? { discussionSlug: props.discussionSlug } : {}),
      ...(props.parentId ? { parentId: props.parentId } : {}),
    },
  },
);
</script>

<template>
  <div class="d-flex flex-column ga-4" v-if="data">
    <CommentCard
      v-for="comment in data.data?.data"
      :comment="comment"
      :blog-slug="blogSlug"
      :discussion-slug="discussionSlug"
    />
    <FormsAddComment
      v-if="withReplyForm"
      :blog-slug="blogSlug"
      placeholder="Reply"
      type="blog"
      :parent-id="parentId"
      :rows="withReplyForm ? 2 : undefined"
      @success="() => refresh()"
    />
  </div>
  <Loader v-else type="card" />
</template>

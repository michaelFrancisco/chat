<template>
  <div class="flex flex-col px-3">
    <div v-for="(message, index) in messages" v-if="messages.length > 0" :key="index">
      <div :class="{
            'mt-6': index > 0 && messages[index - 1].user.uuid != message.user.uuid,
            'mt-0.5': index > 0 && messages[index - 1].user.uuid == message.user.uuid,
            'flex-row-reverse': uuid == message.user.uuid,
           }"
           class="flex flex-row gap-2">
        <Avatar
            v-if="index === messages.length - 1 || messages[index + 1].user.uuid != message.user.uuid"
            class="self-end"
            shape="circle">{{ message.user.avatar }}
        </Avatar>
        <Avatar v-else class="self-end invisible" shape="circle"></Avatar>
        <div class="flex flex-col gap-1">
          <p v-if="messages[index - 1]?.user.uuid != message.user.uuid" class="text-[0.7em] text-gray-500 ml-2">
            {{ message.user.username }}</p>
          <p class="bg-gray-300 rounded-xl p-2 text-sm max-w-[20em] break-words">{{ message.content }}</p>
        </div>
      </div>
    </div>
    <div v-else class="flex justify-center">
      <p>Say something to kick off the conversation!</p>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {useChatStore} from "@/stores/chat";
import {storeToRefs} from "pinia";
import {computed} from "vue";

const chatStore = useChatStore()
const {messages} = storeToRefs(chatStore)

const uuid = computed(() => window.localStorage.getItem('uuid'))

</script>
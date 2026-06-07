<template>
  <v-container class="fill-height d-flex flex-column align-center justify-center">
    <v-icon size="80" color="grey-lighten-1">{{ mdiMapSearchOutline }}</v-icon>
    <h1 style="font-size: 4rem; color: #bdbdbd; margin-top: 1rem">404</h1>
    <p style="font-size: 1.1rem; color: #999; margin: 1rem 0 2rem">页面未找到或已被移除</p>
    <v-btn color="primary" rounded="lg" @click="router.push('/')">
      <v-icon start>{{ mdiHome }}</v-icon>
      返回首页
    </v-btn>
  </v-container>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { mdiMapSearchOutline, mdiHome } from '@mdi/js'
const router = useRouter()
</script>

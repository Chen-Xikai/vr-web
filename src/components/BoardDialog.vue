<template>
  <v-dialog
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    :max-width="dialogMaxWidth"
    :fullscreen="mobile"
    scrollable
  >
    <v-card :style="mobile ? 'max-height: 90vh' : ''">
      <div class="dialog-accent" />
      <v-card-text>
        <v-row v-if="board?.text" :class="{ 'flex-column': mobile }">
          <v-col :cols="mobile ? 12 : 6">
            <v-img :src="board.image" class="bg-grey-lighten-2" cover>
              <template v-slot:placeholder>
                <v-row align="center" class="fill-height ma-0" justify="center">
                  <v-progress-circular color="grey-lighten-5" indeterminate />
                </v-row>
              </template>
            </v-img>
          </v-col>
          <v-col :cols="mobile ? 12 : 6">
            <div class="board-title">{{ board.title }}</div>
            <div class="board-text">{{ board.text }}</div>
          </v-col>
        </v-row>
        <v-row v-else>
          <v-col>
            <v-img :src="board?.image" class="bg-grey-lighten-2" cover>
              <template v-slot:placeholder>
                <v-row align="center" class="fill-height ma-0" justify="center">
                  <v-progress-circular color="grey-lighten-5" indeterminate />
                </v-row>
              </template>
            </v-img>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions v-if="board?.text && board?.audio">
        <v-spacer />
        <v-btn-group variant="tonal" divided density="comfortable">
          <v-btn :active="lang === 'chs'" @click="setLanguage('chs')">中文</v-btn>
          <v-btn :active="lang === 'eng'" @click="setLanguage('eng')">英语</v-btn>
          <v-btn :active="lang === 'tcw'" @click="setLanguage('tcw')">潮汕话</v-btn>
        </v-btn-group>
        <v-spacer />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { computed, watch } from 'vue'
import { useDisplay } from 'vuetify'
import { useI18n } from '@/composables/useI18n'
import { useAudioManager } from '@/composables/useAudioManager'

const props = defineProps({
  modelValue: Boolean,
  board: Object,
})

defineEmits(['update:modelValue'])

const { mobile } = useDisplay()
const { lang, setLanguage, getAudioSrc } = useI18n()
const audioManager = useAudioManager()

const dialogMaxWidth = computed(() => (mobile.value ? '95vw' : '720px'))

watch(
  () => props.modelValue,
  (visible) => {
    if (visible && props.board?.audio) {
      audioManager.play(getAudioSrc(props.board))
    } else {
      audioManager.stop()
    }
  },
)

watch(lang, () => {
  if (props.modelValue && props.board?.audio) {
    audioManager.play(getAudioSrc(props.board))
  }
})
</script>

<style scoped>
.dialog-accent {
  height: 4px;
  background: linear-gradient(90deg, #C62828, #E57373);
}

.board-title {
  font-family: 'Title', sans-serif;
  font-weight: bold;
  font-size: clamp(1rem, 2.5vw, 1.3rem);
  margin-bottom: 0.75rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(198, 40, 40, 0.15);
  color: #2c3e50;
}

.board-text {
  font-size: clamp(0.85rem, 2vw, 1rem);
  line-height: 1.8;
  color: #333;
}
</style>

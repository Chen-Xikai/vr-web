<template>
  <v-container style="padding: 0">
    <v-row style="margin: 0">
      <v-carousel
        height="35vh"
        style="width: 100%"
        cycle
        hide-delimiter-background
        delimiter-icon="mdi-square"
        show-arrows-on-hover
      >
        <v-carousel-item v-for="i in images" :key="i" :src="i" cover />
      </v-carousel>
    </v-row>
    <v-container style="background-color: #faf3ed; border-radius: 10px">
      <v-row>
        <v-col cols="12" style="padding: 1vh 2.5vw">
          <v-card
            variant="flat"
            style="
              background-color: white;
              color: black;
              border-radius: 10px;
              box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
            "
          >
            <v-card-title
              style="display: flex; align-items: center; justify-content: space-between"
            >
              <div class="section-header">
                <span class="section-header__bar" />
                <span class="title">周鲁烈士故居</span>
              </div>
              <v-btn
                :prepend-icon="mdiRotate3d"
                rounded="xl"
                variant="tonal"
                color="primary"
                @click="vr()"
              >
                全景漫游
              </v-btn>
            </v-card-title>
            <v-container>
              <v-row>
                <v-col style="padding: 0 10px">
                  <span class="content">
                    位于揭阳市空港经济区地都镇华美村，2020年挂牌成为当地首个红色革命教育基地。故居完整保留烈士生活场景，陈列其军装、武器、勋章等遗物及书画作品。2021年增建烈士铜像，现为空港经济区红色文化核心载体。
                  </span>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col style="padding: 0">
          <v-card style="color: black" variant="text">
            <v-card-title>
              <div class="section-header">
                <span class="section-header__bar" />
                <span class="title">视频介绍</span>
              </div>
            </v-card-title>
            <v-slide-group v-model="model" selected-class="bg-primary" show-arrows>
              <v-slide-group-item
                v-for="(n, index) in videos"
                :key="n"
                v-slot="{ toggle, selectedClass }"
              >
                <v-card
                  :class="['ma-4', selectedClass]"
                  color="grey-lighten-1"
                  height="10vh"
                  width="25vw"
                  @click="toggle"
                >
                  <div class="d-flex fill-height align-center justify-center">
                    <v-scale-transition>
                      <v-img :src="`/video/poster-${index + 1}.webp`" />
                    </v-scale-transition>
                  </div>
                </v-card>
              </v-slide-group-item>
            </v-slide-group>

            <v-expand-transition>
              <v-sheet v-if="model != null" :height="mobile ? 200 : 300">
                <div class="d-flex fill-height align-center justify-center">
                  <video-player
                    :src="videos[model]"
                    :poster="`/video/poster-${model + 1}.webp`"
                    controls
                    :volume="0.6"
                    :height="mobile ? 200 : 300"
                  />
                </div>
              </v-sheet>
            </v-expand-transition>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card style="color: black" variant="text">
            <v-card-title>
              <div class="section-header">
                <span class="section-header__bar" />
                <span class="title">人物介绍</span>
              </div>
            </v-card-title>
            <v-container>
              <p class="content">
                周鲁（又名周湘亮、柯维舟），揭阳地都华美村人，越南华侨革命烈士，原是中国共产党党员。1928年中国大革命失败后，赴越南继续进行革命活动。1930年加入中国共产党，任中共上莆区委书记、桑浦山特别委员会主席、华美村农会主席等职。1941年七·二四事件后牺牲，时年仅30岁左右。
              </p>
              <p class="content">
                周鲁自幼聪颖好学，富有正义感，童年就开始接受家书中西方民主、自由、人权等思想影响，在读书时便开始参与革命活动。1927年中国大革命失败后，他赴越南堤岸继续革命活动，是南越华侨共产党组织重要成员。1928年，他与许振来等加强侨党领导力量，后任侨党特委委员。1930年初，许振来等回国后，他主持侨党特委工作。同年，作为侨党代表与越共代表协商，联合发起反帝反殖民斗争大同盟运动，推动形成国际主义革命力量。
              </p>
              <p class="content">
                他还在西堤领导产业工人运动，组织多个工会活动。1936年参与恢复进德社，引导华侨各界开展进步活动。1937年"卢沟桥事变"后，他组织了"西堤华侨抗日救国联合会"，1939年在集友夜校培训班讲解祖国抗战形势，曾担任《全民》周刊主笔，宣传党的主张；1940年参与创办《侨众报》，负责编辑部工作，宣传抗日救亡。
              </p>
              <p class="content">
                1942年11月30日在头顿被捕，1943年4月16日遭杀害并被沉入海底，牺牲时保持共产党人气节，忠诚于党和人民。
              </p>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { VideoPlayer } from '@videojs-player/vue'
import { mdiRotate3d } from '@mdi/js'
import { useDisplay } from 'vuetify'

const { mobile } = useDisplay()

const router = useRouter()
const model = ref(null)
function vr() {
  router.push({
    name: 'vr',
    params: { sceneId: 'a03' },
  })
}
const images = ['/imgs/1.webp', '/imgs/2.webp', '/imgs/3.webp']
const videos = ['/video/1.mp4']
</script>

<style scoped>
.section-header {
  display: flex;
  align-items: center;
  gap: 10px;
}

.section-header__bar {
  width: 4px;
  height: 24px;
  background: #c62828;
  border-radius: 2px;
  flex-shrink: 0;
}

.title {
  font-family: 'Title', sans-serif;
  font-size: clamp(1.1rem, 4vw, 1.8rem);
}

.content {
  font-family: 'Content', sans-serif;
  font-size: clamp(0.9rem, 2.5vw, 1.15rem);
  line-height: 1.8;
  color: #333;
  margin: 0;
}

.content + .content {
  margin-top: 1rem;
  text-indent: 2em;
}
</style>

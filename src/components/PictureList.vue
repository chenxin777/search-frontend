<script setup lang="ts">
import {withDefaults, defineProps, toRefs} from 'vue';
import logo from '../assets/jfj.jpeg'

interface Props {
  pictureList: any[];
}

const props = withDefaults(defineProps<Props>(), {
  pictureList: () => [],
});

</script>

<template>
  <a-list :grid="{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3 }" :data-source="props.pictureList">
    <template #renderItem="{ item }">
      <a-list-item>
        <a-card hoverable>
          <template #cover>
            <img alt="example" :src="item.url"/>
          </template>
          <a-card-meta :title="item.title">
          </a-card-meta>
        </a-card>
      </a-list-item>
    </template>
  </a-list>
</template>

<style scoped>
.pic {
  width: 200px;
}
</style>
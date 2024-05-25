<script setup lang="ts">
import {withDefaults, defineProps, toRefs} from 'vue';
import logo from '../assets/jfj.jpeg'

interface Props {
  userList: any[];
}

const props = withDefaults(defineProps<Props>(), {
  userList: () => [],
});

</script>

<template>
  <a-list :grid="{ gutter: 16, column: 4 }" :data-source="props.userList">
    <template #renderItem="{ item }">
      <a-list-item>
        <a-card hoverable style="width: 240px">
          <template #cover>
            <img alt="example" :src="logo"/>
          </template>
          <a-card-meta :title="item.userName">
            <template #description>{{item.userProfile}}</template>
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
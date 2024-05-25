<template>
  <div class="index-page">
    <a-input-search
        v-model:value="searchParam.text"
        placeholder="input search text"
        enter-button="Search"
        size="large"
        @search="onSearch"
    />
    <my-divider/>
    <a-tabs v-model:activeKey="activeKey" @change="onTabChange">
      <a-tab-pane key="post" tab="文章"><post-list :post-list="postList"/></a-tab-pane>
      <a-tab-pane key="user" tab="用户"><UserList :user-list="userList"/></a-tab-pane>
      <a-tab-pane key="picture" tab="图片"><PictureList/></a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup lang="ts">

import {ref, watchEffect} from 'vue';
import PostList from '@/components/PostList.vue';
import UserList from '@/components/UserList.vue';
import PictureList from '@/components/PictureList.vue';
import MyDivider from '@/components/MyDivider.vue';
import {useRoute, useRouter} from 'vue-router';
import myAxios from '@/plugins/axios';

const router = useRouter();
const route = useRoute();
const activeKey = route.params.category;

const initSearchParam = {
  text: '',
  pageSize: 10,
  pageNum: 1,
}

const searchParam = ref(initSearchParam);

const postList = ref([]);
const userList = ref([]);

watchEffect(() => {
  searchParam.value = {
    ...initSearchParam,
    text: route.query.text
  };

})

const onSearch = (value: string) => {
  router.push({
    query: searchParam.value,
  })
};

const onTabChange = (key: string) => {
  router.push({
    path: `/${key}`,
    query: searchParam.value,
  })
};

myAxios.post('post/list/page/vo', {}).then(res => {
  postList.value = res.records;
})

myAxios.post('user/list/page/vo', {}).then(res => {
  userList.value = res.records;
})

</script>

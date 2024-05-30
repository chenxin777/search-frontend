<template>
  <div class="index-page">
    <a-input-search
        v-model:value="searchText"
        placeholder="input search text"
        enter-button="Search"
        size="large"
        @search="onSearch"
    />
    <my-divider/>
    <a-tabs v-model:activeKey="activeKey" @change="onTabChange">
      <a-tab-pane key="post" tab="文章"><post-list :post-list="postList"/></a-tab-pane>
      <a-tab-pane key="user" tab="用户"><UserList :user-list="userList"/></a-tab-pane>
      <a-tab-pane key="picture" tab="图片"><PictureList :picture-list="pictureList"/></a-tab-pane>
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
import {message} from 'ant-design-vue';

const router = useRouter();
const route = useRoute();
const activeKey = route.params.category;
const searchText = ref(route.query.text || '');

/**
 * 加载数据
 * @param params
 */
const loadDataOld = (params: any) => {
  const postQuery = {
    ...params,
    searchText: params.text
  }
  const userQuery = {
    ...params,
    userName: params.text
  }
  const pictureQuery = {
    ...params,
    searchText: params.text
  }
  myAxios.post('post/list/page/vo', postQuery).then(res => {
    postList.value = res.records;
  })

  myAxios.post('user/list/page/vo', userQuery).then(res => {
    userList.value = res.records;
  })

  myAxios.post('picture/list/page/vo', pictureQuery).then(res => {
    pictureList.value = res.records;
  })
}

/**
 * 加载聚合数据
 * @param params
 */
const loadAllData = (params: any) => {
  const query = {
    ...params,
    searchText: params.text,
  }
  myAxios.post('search/all', query).then(res => {
    postList.value = res.postVOList;
    userList.value = res.userVOList;
    pictureList.value = res.pictureList;
  })
}

/**
 * 加载单类数据
 * @param params
 */
const loadData = (params: any) => {
  const {type} = params;
  if (! type) {
    message.error('类别为空');
    return;
  }
  const query = {
    ...params,
    searchText: params.text,
  }
  myAxios.post('search/all', query).then(res => {
    if (type === 'post') {
      postList.value = res.dataList;
    } else if (type === 'user') {
      userList.value = res.dataList;
    } else if (type === 'picture') {
      pictureList.value = res.dataList;
    }
  })
}

const initSearchParam = {
  type: activeKey,
  text: '',
  pageSize: 10,
  pageNum: 1,
}

const searchParam = ref(initSearchParam);
const postList = ref([]);
const userList = ref([]);
const pictureList = ref([]);

watchEffect(() => {
  searchParam.value = {
    ...initSearchParam,
    text: route.query.text,
    type: route.params.category,
  } as any;
  loadData(searchParam.value)
});

const onSearch = (value: string) => {
  router.push({
    query: {
      ...searchParam.value,
      text: value,
    },
  });
};

const onTabChange = (key: string) => {
  router.push({
    path: `/${key}`,
    query: searchParam.value,
  })
};

</script>

<script setup>
import GoodsItem from '@/pages/Home/components/GoodsItem.vue'
import {useBanner} from '@/pages/Category/composables/useBanner.js'
import {useCategory} from '@/pages/Category/composables/useCategory.js'
import {useCategoryStore} from '@/stores/categoryStore.js'
import {useRoute} from 'vue-router'

// 获取轮播图
const {bannerList} = useBanner()
// 获取分类数据
const {categoryData} = useCategory()
// 获取pinia里存的一级分类数据
const categoryStore = useCategoryStore()

const route = useRoute()
const setFromLink = () => {
  categoryStore.setFromLink(route.params.id)
}
</script>

<template>
  <!--{{ $route.params.id }}-->
  <!--{{ categoryData.id }}-->
  <div class="top-category">
    <div class="container m-top-20">
      <!-- 面包屑 -->
      <div class="bread-container">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{
              $route.params.id === categoryData.id ? categoryData.name : '...'
            }}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 轮播图 -->
      <div v-loading="bannerList.length === 0" class="home-banner">
        <el-carousel height="500px">
          <el-carousel-item v-for="item in bannerList" :key="item.id">
            <img :src="item.imgUrl" alt="">
          </el-carousel-item>
        </el-carousel>
      </div>
      <!-- 全部分类 -->
      <div class="sub-list">
        <h3>全部分类</h3>
        <ul v-if="$route.params.id === categoryData.id" v-loading="$route.params.id !== categoryData.id">
          <li v-for="i in categoryData.children" :key="i.id">
            <RouterLink @click="setFromLink" :to="`/category/${$route.params.id}/sub/${i.id}`">
              <img :src="i.picture" alt=""/>
              <p>{{ i.name }}</p>
            </RouterLink>
          </li>
        </ul>
        <div v-else style="height: 160px" v-loading="$route.params.id !== categoryData.id"></div>
      </div>

      <div class="ref-goods" v-for="item in categoryData.children" :key="item.id">
        <div class="head">
          <h3>{{ $route.params.id === categoryData.id ? `-${item.name}-` : '...' }}</h3>
        </div>
        <div class="body">
          <template v-if="$route.params.id === categoryData.id">
            <GoodsItem v-loading="$route.params.id !== categoryData.id" v-for="good in item.goods" :good="good"
                       :key="good.id"/>
          </template>
          <template v-else>
            <div style="height: 300px" v-loading="$route.params.id !== categoryData.id"></div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped lang="scss">
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }

  .sub-list {
    margin-top: 20px;
    background-color: #fff;

    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;

      li {
        width: 168px;
        height: 160px;

        .active {
          color: $xtxColor;
          border-bottom: 1px solid $xtxColor;
        }

        a {
          text-align: center;
          display: block;
          font-size: 16px;

          img {
            width: 100px;
            height: 100px;
          }

          p {
            line-height: 40px;
          }

          &:hover {
            color: $xtxColor;
          }
        }
      }
    }
  }

  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;

    .head {
      .xtx-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }

      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }

    .body {
      display: flex;
      justify-content: space-around;
      padding: 0 40px 30px;
    }
  }

  .bread-container {
    padding: 25px 0;
  }
}

.home-banner {
  width: 1240px;
  height: 500px;

  img {
    width: 100%;
    height: 500px;
  }
}
</style>
import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getCategoryAPI } from '@/apis/layoutAPI.js'

export const useCategoryStore = defineStore('category', () => {
  // state
  const categoryList = ref([])
  const fromLink = ref(null)

  // actions
  const getCategory = async () => {
    const res = await getCategoryAPI()
    categoryList.value = res.result
  }
  const setFromLink = (link) => {
    fromLink.value = link
  }

  return {
    categoryList,
    fromLink,

    getCategory,
    setFromLink,
  }
})

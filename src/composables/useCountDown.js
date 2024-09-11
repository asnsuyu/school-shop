import dayjs from 'dayjs'
import { computed, onUnmounted, ref } from 'vue'

// 将指定的 1个 倒计时格式化为xx分xx秒的形式
export const useCountDown = () => {
  let timer = null
  const time = ref(0)
  const formatTime = computed(() => dayjs.unix(time.value).format('mm分ss秒'))  // 最后用于显示的格式化时间
  const timeOut = computed(() => time.value < 0)  // 倒计时结束的标志

  const start = (totalTime) => {
    time.value = totalTime  // 获取指定倒计时时间
    timer = setInterval(() => {
      time.value--
      if (time.value < 0) {
        clearInterval(timer)
      }
    }, 1000)
  }

  // 组件销毁时清除定时器
  onUnmounted(() => {
    timer && clearInterval(timer)
  })

  return {
    formatTime,
    timeOut,
    start,
  }
}

// 将指定的 多个 倒计时格式化为xx分xx秒的形式
export const useCountDownList = () => {
  const timers = ref([])  // 存储多个计时器

  const createTimer = (totalTime) => {
    const timerRef = {
      index: 0,
      time: ref(totalTime),
      formatTime: computed(() => dayjs.unix(totalTime).format('mm分ss秒')),
      timerId: null,
    }

    // 启动计时器
    timerRef.timerId = setInterval(() => {
      timerRef.time.value--
      if (timerRef.time < 0) {
        clearInterval(timerRef.timerId)
        // timerRef.value.timerId = null
      }
    }, 1000)

    // 将计时器添加到列表中
    timers.value.f
    timers.value.push(timerRef)

    return timerRef
  }

  // 销毁时清理所有定时器
  onUnmounted(() => {
    timers.value.forEach((timer) => {
      timer.timerId && clearInterval(timer.timerId)
    })
  })

  return {
    createTimer,  // 用于创建计时器
    timers,  // 所有计时器的列表
  }
}
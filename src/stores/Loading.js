import { defineStore } from 'pinia'

export const useLoadingStore = defineStore('loading', {
  state: () => ({ load: true }),
  actions: {
    showLoading() {
      this.load = true
    },
    hideLoading() {
      this.load = false
    },
    toggleLoading() {
      this.load = !this.load
    }
  }
})

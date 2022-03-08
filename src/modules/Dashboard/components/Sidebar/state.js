import { ref, computed } from 'vue'

export const collapsed = ref(false)
export const openSidebar = ref(false)
export const toggleSidebar = () => (collapsed.value = !collapsed.value)
export const toggleSidebarFromRoute = () => (openSidebar.value = !openSidebar.value)

export const SIDEBAR_WIDTH = 300
export const SIDEBAR_WIDTH_COLLAPSED = 70
export const sidebarWidth = computed( () => `${collapsed.value ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH}px`)
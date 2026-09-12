<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'
import { useSidebar } from 'vitepress/theme'

const { page } = useData()
const { sidebar } = useSidebar()

const trail = computed(() => {
  const route = page.value.relativePath.replace(/\\/g, '/').replace(/\.md$/, '')
  const link = '/' + (route === 'index' ? '' : route)
  for (const group of sidebar.value) {
    const current = (group.items || []).find((item) => item.link === link)
    if (current) {
      return { group: group.text, title: current.text }
    }
  }
  return null
})
</script>

<template>
  <nav v-if="trail" class="vp-breadcrumb" aria-label="面包屑">
    <span class="vp-breadcrumb-group">{{ trail.group }}</span>
    <span class="vp-breadcrumb-sep" aria-hidden="true">/</span>
    <span class="vp-breadcrumb-current">{{ trail.title }}</span>
  </nav>
</template>

<style scoped>
.vp-breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--vp-c-text-2);
  margin-bottom: 12px;
}

.vp-breadcrumb-group {
  color: var(--vp-c-text-3);
}

.vp-breadcrumb-sep {
  color: var(--vp-c-divider);
}

@media (min-width: 960px) {
  .vp-breadcrumb {
    margin-bottom: -4px;
  }
}
</style>

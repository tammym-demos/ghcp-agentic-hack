<script setup lang="ts">
import { computed } from "vue";

const personas = {
  morgan: {
    name: "Morgan Charter",
    role: "Human sponsor",
    image: "persona-morgan.png"
  },
  mergewell: {
    name: "Agent Mergewell",
    role: "Human engineer",
    image: "persona-mergewell.png"
  },
  riley: {
    name: "Riley Relay",
    role: "Software agent",
    image: "persona-riley.png"
  },
  purrmission: {
    name: "Purrmission",
    role: "Boundary reminder",
    image: "persona-purrmission.png"
  }
} as const;

const props = defineProps<{
  title: string;
  person?: keyof typeof personas;
  action?: string;
  compact?: boolean;
}>();

const persona = computed(() => props.person ? personas[props.person] : undefined);
const imageUrl = computed(() => persona.value ? `${import.meta.env.BASE_URL}images/${persona.value.image}` : undefined);
</script>

<template>
  <div class="story-panel" :class="{ 'story-panel--compact': compact }">
    <h2>{{ title }}</h2>
    <div class="story-panel__beats">
      <slot />
    </div>
    <div v-if="persona" class="story-panel__persona">
      <img class="story-panel__portrait" :src="imageUrl" alt="" />
      <div class="story-panel__identity">
        <strong>{{ persona.name }}</strong>
        <span>{{ persona.role }}<template v-if="action"> · {{ action }}</template></span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.story-panel {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 0.65rem;
  width: 100%;
  height: 100%;
  padding: 1.1rem;
  box-sizing: border-box;
  color: #1f2328;
}

.story-panel__persona {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  gap: 0.7rem;
  margin-top: auto;
}

.story-panel__persona img.story-panel__portrait {
  flex: 0 0 3.35rem;
  width: 3.35rem;
  height: 3.35rem;
  border: 1px solid #d0d7de;
  border-radius: 50%;
  object-fit: cover;
}

.story-panel__identity {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  min-width: 0;
  line-height: 1.2;
}

.story-panel__identity strong {
  color: #1f2328;
  font-size: 0.95rem;
}

.story-panel__identity span {
  color: #57606a;
  font-size: 0.8rem;
}

.story-panel h2 {
  margin: 0;
  color: #1f2328;
  font-size: 1.4rem;
  line-height: 1.2;
}

.story-panel__beats {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.story-panel__beats :deep(p) {
  margin: 0;
  font-size: 1.05rem;
  line-height: 1.35;
}

.story-panel--compact {
  gap: 0.5rem;
}

.story-panel--compact .story-panel__beats {
  gap: 0.35rem;
}

.story-panel--compact .story-panel__beats :deep(p) {
  font-size: 0.96rem;
  line-height: 1.27;
}
</style>

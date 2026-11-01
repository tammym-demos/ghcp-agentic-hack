<script setup lang="ts">
import { useSlideContext } from "@slidev/client";

const { $page } = useSlideContext();
const logoUrl = `${import.meta.env.BASE_URL}images/microsoft-logo.png`;
</script>

<template>
  <div class="modernization-brand" :data-brand-page="$page">
    <img :src="logoUrl" alt="Microsoft" />
  </div>
</template>

<style>
.modernization-brand {
  position: absolute;
  right: 1.5rem;
  bottom: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  height: 1.75rem;
  pointer-events: none;
}

.modernization-brand img {
  display: block;
  width: auto;
  height: 1.75rem;
  object-fit: contain;
}
</style>

<script setup lang="ts">
import SinglePanel from "./single-panel.vue";
import SlideTitle from "../components/SlideTitle";
</script>

<template>
  <SinglePanel class="bureau-slide">
    <template #title><SlideTitle split-title><slot name="title" /></SlideTitle></template>
    <template #content><slot name="content"><slot /></slot></template>
  </SinglePanel>
</template>

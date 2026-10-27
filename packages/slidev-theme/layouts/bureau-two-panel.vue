<script setup lang="ts">
import TwoPanel from "./two-panel.vue";
import SlideTitle from "../components/SlideTitle";
</script>

<template>
  <TwoPanel class="bureau-slide">
    <template #title><SlideTitle split-title><slot name="title" /></SlideTitle></template>
    <template #text><slot name="text" /></template>
    <template #visual><slot name="visual" /></template>
  </TwoPanel>
</template>

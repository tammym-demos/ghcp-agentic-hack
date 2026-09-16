<script setup lang="ts">
import { useSlideContext } from "@slidev/client";

const { $page } = useSlideContext();
const brandBase = `${import.meta.env.BASE_URL}images/`;
</script>

<template>
  <footer
    class="mc-brand-footer"
    :class="{ 'mc-brand-footer--opening': $page === 1 }"
    :data-brand-page="$page"
    aria-label="Technology brands"
  >
    <img class="mc-brand-footer__microsoft" :src="`${brandBase}microsoft-logo.png`" alt="Microsoft" />
    <img class="mc-brand-footer__github" :src="`${brandBase}GitHub_Lockup_Black_Clearspace.svg`" alt="GitHub" />
  </footer>
</template>

<style>
.mc-brand-footer {
  box-sizing: border-box;
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  height: 52px;
  border-top: 1px solid #d8cfc2;
  background: #fff;
  pointer-events: none;
}

.mc-brand-footer img {
  display: block;
  flex-shrink: 0;
  width: auto;
  max-width: none;
  object-fit: contain;
  opacity: 1;
  filter: none;
}

.mc-brand-footer__microsoft {
  height: 48px;
}

.mc-brand-footer__github {
  height: 22px;
}

.mc-brand-footer--opening {
  height: 76px;
}

.mc-brand-footer--opening .mc-brand-footer__microsoft {
  height: 72px;
}

.mc-brand-footer--opening .mc-brand-footer__github {
  height: 34px;
}
</style>

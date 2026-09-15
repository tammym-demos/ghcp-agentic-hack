<script setup lang="ts">
import { nextTick, ref } from "vue";
import { useSlideContext } from "@slidev/client";

const { $page } = useSlideContext();
const brandBase = `${import.meta.env.BASE_URL}images/`;
const dialog = ref<HTMLDialogElement>();
const copy = ref<HTMLElement>();
const slideTitle = ref("");

async function readCurrentSlide() {
  const slide = [...document.querySelectorAll<HTMLElement>(".slidev-layout.mc")]
    .find(el => el.getBoundingClientRect().width > 0 && getComputedStyle(el).visibility !== "hidden");
  if (!slide) return;
  slideTitle.value = slide.querySelector("h1")?.textContent ?? "Current slide";
  await nextTick();
  const clone = slide.cloneNode(true) as HTMLElement;
  clone.classList.add("mc-reader-copy");
  clone.removeAttribute("style");
  clone.querySelectorAll("[id]").forEach(el => el.removeAttribute("id"));
  clone.querySelectorAll("table").forEach(el => {
    el.tabIndex = 0;
    el.setAttribute("aria-label", "Slide table; scroll horizontally for all columns");
  });
  clone.querySelectorAll(".slidev-vclick-hidden, .slidev-vclick-current, .slidev-vclick-prior").forEach(el => {
    el.classList.remove("slidev-vclick-hidden", "slidev-vclick-current", "slidev-vclick-prior");
  });
  // The same native content, fully revealed; no copied presenter notes or media.
  copy.value?.replaceChildren(clone);
  dialog.value?.showModal();
}
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
  <button class="mc-reader-open" type="button" @click="readCurrentSlide">
    Read this slide
  </button>
  <dialog ref="dialog" class="mc-reader-dialog" aria-labelledby="mc-reader-title">
    <header>
      <div><small>Full click state · tables scroll sideways</small><h2 id="mc-reader-title">{{ slideTitle }}</h2></div>
      <button type="button" autofocus @click="dialog?.close()">Close</button>
    </header>
    <div ref="copy" class="mc-reader-body" />
  </dialog>
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

.mc-reader-open,
.mc-reader-dialog {
  font-family: "Mona Sans", "Segoe UI", Arial, sans-serif;
  color: #24211f;
}

.mc-reader-open {
  position: fixed;
  right: 14px;
  bottom: 10px;
  z-index: 30;
  padding: 7px 12px;
  border: 1px solid #d8cfc2;
  border-radius: 7px;
  background: #fffdf7;
  font-size: 13px;
  line-height: 1.3;
  cursor: pointer;
}

.mc-reader-open:focus-visible,
.mc-reader-dialog button:focus-visible {
  outline: 3px solid #7650b7;
  outline-offset: 3px;
}

.mc-reader-dialog {
  box-sizing: border-box;
  width: min(840px, calc(100vw - 24px));
  max-height: calc(100dvh - 24px);
  margin: auto;
  padding: 0;
  border: 1px solid #d8cfc2;
  border-radius: 12px;
  background: #fffdf7;
  font-size: 17px;
  overflow-y: auto;
}

.mc-reader-dialog::backdrop {
  background: rgb(36 33 31 / 45%);
}

.mc-reader-dialog > header {
  position: sticky;
  top: 0;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 16px 18px;
  border-bottom: 1px solid #d8cfc2;
  background: #fffdf7;
}

.mc-reader-dialog > header small {
  color: #625b54;
  font-size: 13px;
}

.mc-reader-dialog > header h2 {
  margin: 4px 0 0;
  font-size: 21px;
  line-height: 1.2;
}

.mc-reader-dialog button {
  padding: 9px 12px;
  border: 1px solid #d8cfc2;
  border-radius: 6px;
  background: #f8f1e7;
  font-size: 16px;
  cursor: pointer;
}

.mc-reader-dialog .slidev-layout.mc.mc-reader-copy {
  display: block;
  width: auto !important;
  height: auto !important;
  min-height: 0;
  padding: 18px;
  overflow: visible;
}

.mc-reader-copy > :is(.ghcp-two-panel__title, .ghcp-single-panel__title) {
  margin-bottom: 18px;
}

.mc-reader-dialog .slidev-layout.mc.mc-reader-copy .ghcp-two-panel__panels,
.mc-reader-dialog .slidev-layout.mc.mc-reader-copy .mc-mission-grid,
.mc-reader-dialog .slidev-layout.mc.mc-reader-copy .mc-profiles,
.mc-reader-dialog .slidev-layout.mc.mc-reader-copy .mc-output-grid,
.mc-reader-dialog .slidev-layout.mc.mc-reader-copy .mc-decision-board {
  grid-template-columns: 1fr;
  gap: 18px;
}

.mc-reader-dialog .slidev-layout.mc.mc-reader-copy :is(.ghcp-two-panel__text, .ghcp-two-panel__visual, .ghcp-single-panel__content) {
  min-height: 0;
  padding: 16px;
  overflow: visible;
}

.mc-reader-dialog .slidev-layout.mc.mc-reader-copy .ghcp-single-panel__content {
  padding: 0;
  border: 0;
}

.mc-reader-dialog .slidev-layout.mc.mc-reader-copy .mc-stack {
  height: auto;
  gap: 16px;
}

.mc-reader-dialog .slidev-layout.mc.mc-reader-copy .mc-table {
  display: block;
  max-width: 100%;
  overflow-x: auto;
  font-size: 16px;
}

.mc-reader-dialog .slidev-layout.mc.mc-reader-copy .mc-table th,
.mc-reader-dialog .slidev-layout.mc.mc-reader-copy .mc-table td {
  min-width: 125px;
}

.mc-reader-dialog .slidev-layout.mc.mc-reader-copy .mc-pacing,
.mc-reader-dialog .slidev-layout.mc.mc-reader-copy .mc-attribution,
.mc-reader-dialog .slidev-layout.mc.mc-reader-copy .mc-value-chain {
  grid-template-columns: 1fr;
}

.mc-reader-dialog .slidev-layout.mc.mc-reader-copy .mc-attribution > i,
.mc-reader-dialog .slidev-layout.mc.mc-reader-copy .mc-value-chain > i {
  transform: rotate(90deg);
}

.mc-reader-dialog .slidev-layout.mc.mc-reader-copy .mc-evidence-link,
.mc-reader-dialog .slidev-layout.mc.mc-reader-copy .mc-meta {
  display: grid;
  gap: 8px;
}

.mc-reader-dialog .slidev-layout.mc.mc-reader-copy :is(.mc-layer, .mc-profile, .mc-mission-grid > div, .mc-decision-board > div) {
  min-height: 0;
}

.mc-reader-dialog .slidev-layout.mc.mc-reader-copy .mc-layer {
  padding: 10px;
}

.mc-reader-dialog .slidev-layout.mc.mc-reader-copy h1 {
  font-size: 28px;
}

.mc-reader-dialog .slidev-layout.mc.mc-reader-copy h2,
.mc-reader-dialog .slidev-layout.mc.mc-reader-copy .mc-deck-title {
  min-height: 0;
  font-size: 25px;
}

.mc-reader-dialog .slidev-layout.mc.mc-reader-copy :is(p, .mc-field, .mc-callout, .mc-prompt, .mc-readout, .mc-return) {
  font-size: 17px;
}

.mc-reader-dialog .slidev-layout.mc.mc-reader-copy :is(.mc-layer small, .mc-small, .mc-node span) {
  font-size: 15px;
}

.mc-reader-dialog .slidev-layout.mc.mc-reader-copy .slidev-vclick-target {
  visibility: visible !important;
  opacity: 1 !important;
  transition: none !important;
  animation: none !important;
}

@media (max-width: 600px) {
  .mc-reader-open {
    right: 16px;
    bottom: 20px;
    padding: 12px 18px;
    font-size: 17px;
  }
}
</style>

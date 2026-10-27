import { defineComponent, Fragment, h, isVNode, type VNode } from "vue";
import { splitSlideTitle } from "../lib/title-lines";

function titleText(node: VNode): string {
  if (typeof node.children === "string") return node.children;
  if (!Array.isArray(node.children)) return "";
  return node.children.map((child) =>
    typeof child === "string" ? child : isVNode(child) ? titleText(child) : ""
  ).join("");
}

function formatTitle(node: VNode): VNode {
  if (node.type === Fragment && Array.isArray(node.children)) {
    return h(Fragment, node.props, node.children.map((child) => isVNode(child) ? formatTitle(child) : child));
  }
  if (node.type !== "h1") return node;
  const { headline, subtitle } = splitSlideTitle(titleText(node));
  if (!subtitle) return node;
  return h("h1", node.props, [
    `${headline} `,
    h("span", { class: "ghcp-slide-subtitle" }, subtitle)
  ]);
}

export default defineComponent({
  props: { splitTitle: Boolean },
  setup(props, { slots }) {
    return () => {
      const title = slots.default?.() ?? [];
      return props.splitTitle ? title.map(formatTitle) : title;
    };
  }
});

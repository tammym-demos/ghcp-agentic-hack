// Consume only slide-navigation keys. Enter/Space retain native button behavior.
export function navigateFromControl(event, nav) {
  const action = { ArrowRight: 'next', PageDown: 'next', ArrowLeft: 'prev', PageUp: 'prev' }[event.key];
  if (!action) return;
  event.preventDefault();
  event.stopPropagation();
  nav[action]();
}

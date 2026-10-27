export function splitSlideTitle(title: string): { headline: string; subtitle: string } {
  const timeColons = new Set(
    Array.from(title.matchAll(/\b(?:[01]?\d|2[0-3]):[0-5]\d\b/g), (match) =>
      match.index + match[0].indexOf(":")
    )
  );
  const separator = Array.from(title.matchAll(/:/g)).find((match) => !timeColons.has(match.index));
  if (!separator || !title.slice(separator.index + 1).trim()) {
    return { headline: title, subtitle: "" };
  }
  return {
    headline: title.slice(0, separator.index + 1),
    subtitle: title.slice(separator.index + 1).trim()
  };
}

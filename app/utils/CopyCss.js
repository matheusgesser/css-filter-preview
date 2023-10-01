export function copyCssCode(css) {
  if (css) {
    css = `filter: ${css};`;
    navigator.clipboard.writeText(css);
  }
}

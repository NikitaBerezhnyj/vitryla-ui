export function toAnchorName(id: string): string {
  return `--vitryla-anchor-${id.replace(/\W/g, "")}`;
}

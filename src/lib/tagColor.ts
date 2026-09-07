const TAG_PALETTE = [
  '#a9d6c1', // mint
  '#f0d79b', // butter
  '#e9a3a9', // coral
  '#c97f86', // mark
  '#9cc3e0', // sky blue
  '#c4aee0', // lavender
  '#8fd0c4', // teal
  '#f0b98d', // peach
  '#b8d68a', // sage
  '#e8aac9', // rose
];

export function tagColor(tag: string): string {
  let hash = 0;
  for (let i = 0; i < tag.length; i++) hash = (hash * 31 + tag.charCodeAt(i)) | 0;
  return TAG_PALETTE[Math.abs(hash) % TAG_PALETTE.length];
}

import type { BPBlock, BPBlockAttributesContent, BPBlockAttributesKey } from '~/types';

export default function mapBusinessProgramBlocks(blocks: BPBlock[]) {
  return blocks.reduce((acc, item) => {
    acc[item.attributes.key] = item.attributes.content;
    return acc;
  },{} as { [key in BPBlockAttributesKey]: unknown[] | BPBlockAttributesContent });
}

import { BlocksRenderer, type BlocksContent } from '@strapi/blocks-react-renderer';

interface BlockContentProps {
  blocks?: BlocksContent | string | null | any;
}

const BlockContent = ({ blocks }: BlockContentProps) => {
  if (!blocks) return null;

  if (typeof blocks === 'string') {
    return <p>{blocks}</p>;
  }

  const content = blocks.content || blocks;

  if (!Array.isArray(content)) {
    return null;
  }

  return <BlocksRenderer content={content} />;
};

export default BlockContent;

import { useTheme } from '@/components/ThemeProvider';
import { memo } from 'react';
import RcTiptapEditor, {
  BaseKit,
  Bold,
  BulletList,
  Italic,
  Link,
  OrderedList,
  Strike,
  TextAlign,
  Underline,
  Heading,
} from 'reactjs-tiptap-editor';

const extensions = [
  BaseKit.configure({
    placeholder: {
      showOnlyCurrent: true,
    },
    characterCount: {
      limit: 5000,
    },
  }),
  Bold,
  Italic,
  Underline,
  Strike,
  BulletList,
  OrderedList,
  TextAlign.configure({ types: ['heading', 'paragraph'] }),
  Link,
  Heading,
];

interface TiptapEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export default memo(function TiptapEditor({
  content,
  onChange,
}: TiptapEditorProps) {
  const { theme } = useTheme();
  return (
    <RcTiptapEditor
      contentClass={'max-h-[10rem] h-auto overflow-y-auto scrollbar-hide'}
      content={content}
      dark={theme === 'dark'}
      extensions={extensions}
      output={'html'}
      onChangeContent={onChange}
    />
  );
});

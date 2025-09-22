import EditorJS from '@editorjs/editorjs';
import { useEffect, useRef } from 'react';

interface Props {
  article: string;
  setArticle: (s: string) => void;
}

export default function TextEditor(props: Props) {
  const editor = { isReady: false } as unknown as EditorJS;
  const isReady = useRef(false);
  const editorRef = useRef(editor);

  useEffect(() => {
    if (!editor.isReady && !isReady.current) {
      const e = new EditorJS({
        holder: 'editor-js',
        onReady: () => {
          editorRef.current = e;
        },
        onChange: async () => {
          const data = await editorRef.current.save();
          props.setArticle(JSON.stringify(data));
        },
        data: JSON.parse(props.article),
      });
      isReady.current = true;
    }
  });

  return (
    <div className="bg-black text-white">
      <div id="editor-js" className=""></div>
    </div>
  );
}

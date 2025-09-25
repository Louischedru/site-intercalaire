import EditorJS from '@editorjs/editorjs';
import { useEffect, useRef } from 'react';
import Image from '../../ejs-blocks/Image/Image';
import Header from '../../ejs-blocks/Header/Header';

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
        data: props.article != '' && JSON.parse(props.article),
        tools: {
          image: {
            class: Image,
            inlineToolbar: true,
          },
          header: {
            class: Header,
            inlineToolbar: true,
          },
        },
      });
      isReady.current = true;
    }
  });

  return (
    <div className="">
      <div id="editor-js" className=""></div>
    </div>
  );
}

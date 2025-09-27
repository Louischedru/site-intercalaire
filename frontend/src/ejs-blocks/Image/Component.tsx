import FileInput from '../../components/forms/FileInput';
import { FormEvent, useEffect, useState } from 'react';
import TextInput from '../../components/forms/TextInput';
import * as articleImageCalls from '../../api-calls/ArticleImage';
import SubmitInput from '../../components/forms/SubmitInput';

interface Props {
  id: number;
  blockId: number;
  updateId: (id: number) => void;
}

export default function COmponent(props: Props) {
  const [inputValue, setInputValue] = useState('');
  const [currentData, setCurrentData] = useState<File>();
  const [imageUrl, setImageUrl] = useState('');
  const [alt, setAlt] = useState('');
  const [id, setId] = useState(props.id || -1);

  useEffect(() => {
    const getItem = async () => {
      try {
        const response = await articleImageCalls.getOne(props.id);
        setImageUrl(response.url);
        setAlt(response.alt);

        const altInput = document.getElementById(
          `ejs-image-alt-${props.blockId}`,
        ) as HTMLInputElement;

        altInput.value = response.alt;
      } catch (error) {
        console.log(error);
      }
    };

    if (props.id >= 0) getItem();
  }, [props]);

  const modifyAlt = async (elementId: number) => {
    try {
      const response = await articleImageCalls.modifyAlt(elementId, alt);
      console.log(response);
      alert('Modification réussie');
    } catch (error) {
      console.log(error);
      alert("Une erreur s'est produite");
    }
  };

  const modifyImage = async () => {
    try {
      const response = await articleImageCalls.modifyImage(id, currentData);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const create = async () => {
    try {
      const response = await articleImageCalls.create(currentData);
      const data = response?.data as { id: number };
      props.updateId(data.id);
      setId(data.id);
      await modifyAlt(data.id);
      alert('Image importée abev succès');
    } catch (error) {
      console.log(error);
      alert("Une erreur s'est produite");
    }
  };

  return (
    <div className="py-5 flex flex-col gap-4">
      <form
        action=""
        onSubmit={(e: FormEvent) => {
          e.preventDefault();
          const doStuff = async () => {
            if (id < 0) {
              await create();
            } else {
              await modifyAlt(id);
              if (currentData) await modifyImage();
            }
          };
          doStuff();
        }}
      >
        <FileInput
          type="image"
          name="Importez une image"
          id={`ejs-image-file-${props.blockId}`}
          value={inputValue}
          file={currentData}
          visualize={<Visualizer element={imageUrl} preview={currentData} />}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.currentTarget.files) {
              setInputValue(e.currentTarget.value);
              setCurrentData(e.currentTarget.files[0]);
            }
          }}
        />
        <div className="mt-3">
          <TextInput
            name="Texte alt"
            id={`ejs-image-alt-${props.blockId}`}
            value={alt}
            onChange={e => {
              setAlt(e.currentTarget.value);
            }}
          />
        </div>
        <div className="flex justify-center p-3">
          <SubmitInput />
        </div>
      </form>
    </div>
  );
}

function Visualizer(props: { element: string | null; preview?: File }) {
  const previewUrl =
    (props.preview && URL.createObjectURL(props.preview)) || null;
  const src = previewUrl || props.element || '';

  return (
    <div>
      <img src={src} alt="" />
    </div>
  );
}

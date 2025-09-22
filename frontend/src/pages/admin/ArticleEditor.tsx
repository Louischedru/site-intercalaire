import { useNavigate, useSearchParams } from 'react-router-dom';
import * as filmArticleCalls from '../../api-calls/FilmArticle';
import { useEffect, useState } from 'react';
import TextInput from '../../components/forms/TextInput';
import TextArea from '../../components/forms/TextArea';
import FileInput from '../../components/forms/FileInput';
import SubmitInput from '../../components/forms/SubmitInput';

export default function ArticleEditor() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [info, setInfo] = useState('');
  const [synopsis, setSynopsis] = useState('');
  const [url, setUrl] = useState('');
  const [poster, setPoster] = useState('');
  const [article, setArticle] = useState('');
  const [images, setImages] = useState('');
  const [page, setPage] = useState('');

  const [inputValue, setInputValue] = useState('');
  const [currentData, setCurrentData] = useState<File>();
  const id = searchParams.get('id');

  const modifyOther = async () => {
    try {
      if (!id) return;
      const response = await filmArticleCalls.modifyOther(parseInt(id), {
        title,
        desc,
        synopsis,
        url,
        info,
        images,
        article,
        page,
      });

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const modifyPoster = async () => {
    if (!currentData) return;
    try {
      const response = await filmArticleCalls.modifyPoster(
        parseInt(id || '-1'),
        currentData,
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteArticle = async () => {
    try {
      const response = await filmArticleCalls.deleteOne(parseInt(id || '-1'));
      console.log(response);
      navigate('/admin/film-articles');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getItem = async () => {
      try {
        const response = await filmArticleCalls.getOnePrivate(
          parseInt(id || '-1'),
        );
        console.log('ARTICLE', response);
        setTitle(response.title);
        setDesc(response.desc);
        setUrl(response.url);
        setInfo(response.info);
        setSynopsis(response.synopsis);
        setPoster(response.poster);
        setImages(response.images);
        setArticle(response.article);
        setPage(response.page);

        const titleInput = document.getElementById(
          'article-title',
        ) as HTMLInputElement;
        const descInput = document.getElementById(
          'article-desc',
        ) as HTMLTextAreaElement;
        const infoInput = document.getElementById(
          'article-info',
        ) as HTMLInputElement;
        const synopsisInput = document.getElementById(
          'article-synopsis',
        ) as HTMLTextAreaElement;
        const urlInput = document.getElementById(
          'article-url',
        ) as HTMLInputElement;

        titleInput.value = response.title;
        descInput.value = response.desc;
        infoInput.value = response.info;
        synopsisInput.value = response.synopsis;
        urlInput.value = response.url;
      } catch (error) {
        console.log(error);
      }
    };

    getItem();
  }, [id]);

  return (
    <div className="bg-white p-10">
      <form
        action=""
        className="px-20 flex flex-col gap-5"
        onSubmit={e => {
          e.preventDefault();
          const doStuff = async () => {
            await modifyOther();
            await modifyPoster();
          };
          doStuff();
        }}
      >
        <FileInput
          type="image"
          name="Importez une image"
          id={`id-m-file`}
          value={inputValue}
          file={currentData}
          visualize={<Visualizer element={poster} preview={currentData} />}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.currentTarget.files) {
              setInputValue(e.currentTarget.value);
              setCurrentData(e.currentTarget.files[0]);
            }
          }}
        />
        <TextInput
          name="Titre"
          id="article-title"
          value={title}
          onChange={e => {
            setTitle(e.currentTarget.value);
          }}
        />
        <TextArea
          name="Description"
          id="article-desc"
          value={desc}
          onChange={e => {
            setDesc(e.currentTarget.value);
          }}
        />
        <TextInput
          name="Informations (Exemple: Réalisateur:Anthony;Durée:20 min;La thématique:Film d'horreur;"
          id="article-info"
          value={info}
          onChange={e => {
            setInfo(e.currentTarget.value);
          }}
        />
        <TextArea
          name="Synopsis"
          id="article-synopsis"
          value={synopsis}
          onChange={e => {
            setSynopsis(e.currentTarget.value);
          }}
        />
        <TextInput
          name="Lien En savoir plus"
          id="article-url"
          value={url}
          onChange={e => {
            setUrl(e.currentTarget.value);
          }}
        />
        <SubmitInput />
        <button
          className="bg-[#e42c2c] p-3 mt-3 text-white"
          onClick={() => deleteArticle()}
        >
          Supprimer 'article
        </button>
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

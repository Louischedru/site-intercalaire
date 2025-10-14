import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TextInput from '../../components/forms/TextInput';
import { useEffect, useState } from 'react';
import SubmitInput from '../../components/forms/SubmitInput';
import * as filmArticleCalls from '../../api-calls/FilmArticle';
import { Link, useNavigate } from 'react-router-dom';

let key = 0;

export default function AdminFIlmArticle() {
  const [active, setActive] = useState(false);

  return (
    <>
      {active && <CreateArticleForm setActive={setActive} />}
      <div className="bg-white p-5 min-h-screen">
        <div className="flex justify-center">
          <button
            className="bg-[#3076cb] text-white p-3"
            onClick={() => setActive(true)}
          >
            <FontAwesomeIcon icon={faPlus} /> Nouveau
          </button>
        </div>
        <ArticleList />
      </div>
    </>
  );
}

function ArticleList() {
  const [page, setPage] = useState('nosprojets');
  const [items, setItems] =
    useState<filmArticleCalls.shortFilmArticleInterface[]>();

  useEffect(() => {
    const getItems = async () => {
      try {
        const response = (await filmArticleCalls.getDrafts(
          page,
        )) as filmArticleCalls.shortFilmArticleInterface[];
        const response2 = (await filmArticleCalls.getPublished(
          page,
        )) as filmArticleCalls.shortFilmArticleInterface[];
        const list = [] as filmArticleCalls.shortFilmArticleInterface[];

        response.forEach(i => list.push(i));
        response2.forEach(i => list.push(i));
        console.log(response);
        setItems(list);
      } catch (error) {
        console.log(error);
      }
    };

    getItems();
  }, [page]);

  return (
    <div>
      <div className="flex justify-center mt-5">
        <button
          disabled={page == 'nosprojets'}
          className="bg-[#ffffff] text-black p-3 disabled:bg-[#3367ba] disabled:text-white"
          onClick={() => {
            setPage('nosprojets');
          }}
        >
          Nos projets
        </button>
        <button
          disabled={page == 'avenir'}
          className="bg-[#ffffff] text-black p-3 disabled:bg-[#3367ba] disabled:text-white"
          onClick={() => {
            setPage('avenir');
          }}
        >
          A venir
        </button>
      </div>
      <div>
        {items?.map(i => {
          key++;
          return (
            <Link
              to={`/admin/article-editor?id=${i.id}`}
              key={`filmarticle-${key}`}
            >
              <div className="cursor-pointer p-5 hover:underline text-xl text-center">
                {i.title}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function CreateArticleForm({ setActive }: { setActive: (b: boolean) => void }) {
  const [title, setTitle] = useState('');
  const [page, setPage] = useState('nosprojets');
  const navigate = useNavigate();

  const submit = async () => {
    try {
      const response = await filmArticleCalls.create({
        title,
        desc: '',
        page,
        article: '',
      });

      console.log(response);
      navigate(`/admin/article-editor?id=${response.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen w-screen fixed top-0 left-0 p-56 z-0 bg-black bg-opacity-50">
      <div className="bg-white w-full p-10">
        <h1 className="text-center font-black text-2xl">Nouvel article</h1>
        <div className="flex justify-center mt-5">
          <button
            disabled={page == 'nosprojets'}
            className="bg-[#ffffff] text-black p-3 disabled:bg-[#3367ba] disabled:text-white"
            onClick={() => setPage('nosprojets')}
          >
            Nos projets
          </button>
          <button
            disabled={page == 'avenir'}
            className="bg-[#ffffff] text-black p-3 disabled:bg-[#3367ba] disabled:text-white"
            onClick={() => setPage('avenir')}
          >
            A venir
          </button>
        </div>
        <form
          action=""
          onSubmit={e => {
            e.preventDefault();
            submit();
          }}
        >
          <TextInput
            name="Titre de l'article"
            id="article-title"
            value={title}
            onChange={e => setTitle(e.currentTarget.value)}
          />
          <div className="flex justify-center mt-5 gap-4">
            <SubmitInput />
            <button
              className="bg-[#e9d6d6] p-2"
              onClick={() => setActive(false)}
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

import Concours from '../components/nos-projets/Concours';
import PageHeader from '../components/PageHeader';

export default function NosProjets() {
  return (
    <>
      <PageHeader
        title="Nos projets"
        textKey="nos-projets.header"
        imageKey="page-headers.nos-projets"
      />
      <div className="ip-bg pt-5">
        <Concours />
      </div>
    </>
  );
}

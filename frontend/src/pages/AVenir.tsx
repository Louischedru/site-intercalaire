import IncomingProjects from '../components/AVenir/Projects';
import PageHeader from '../components/PageHeader';

export default function AVenir() {
  return (
    <div>
      <PageHeader
        title="à venir"
        textKey="a-venir.header"
        imageKey="page-headers.a-venir"
      />
      <div className="ip-bg py-10">
        <IncomingProjects />
      </div>
    </div>
  );
}

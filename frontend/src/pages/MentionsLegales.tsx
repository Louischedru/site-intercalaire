import SimpleText from '../components/FDCs/SimpleText';
import Title from '../components/Title';

export default function MentionsLegales() {
  return (
    <div>
      <div
        className="ip-bg p-5 md:p-10 lg:p-16 xl:p-24"
        style={{
          minHeight: '80vh',
        }}
      >
        <div className="mb-5">
          <Title name="Mentions Légales" />
        </div>
        <SimpleText itemKey="mentions-legales" />
      </div>
    </div>
  );
}

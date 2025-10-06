import SimpleText from '../components/FDCs/SimpleText';

export default function Contact() {
  return (
    <div>
      <div className="bg-ip-blue p-8 text-center text-white md:p-16 md:text-left">
        <h1 className="gobold text-white text-2xl xl:text-3xl">Contact</h1>
      </div>
      <div
        className="ip-bg p-5 flex items-center flex-col justify-center"
        style={{
          height: '50vh',
        }}
      >
        <h2 className="font-black text-2xl text-center mb-5 md:text-3xl">
          Vous avez une demande, ou uue question ?
        </h2>
        <div className="text-center">
          <SimpleText itemKey="contact.email-and-phone" />
        </div>
      </div>
    </div>
  );
}

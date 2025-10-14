import { useState } from 'react';
import SimpleText from '../components/FDCs/SimpleText';
import sendMail from '../api-calls/Mail';
import SubmitInput from '../components/forms/SubmitInput';
import TextInput from '../components/forms/TextInput';
import TextArea from '../components/forms/TextArea';

export default function Contact() {
  return (
    <div>
      <div className="bg-ip-blue p-8 text-center text-white md:p-16 md:text-left">
        <h1 className="gobold text-white text-2xl xl:text-3xl">Contact</h1>
      </div>
      <div
        className="ip-bg p-5 flex items-center flex-col justify-center md:p-10"
        style={{
          minHeight: '70vh',
        }}
      >
        <div className="w-full lg:flex lg:gap-5 lg:items-center">
          <div className="mb-10 lg:w-2/3">
            <ContactForm />
          </div>
          <div className="lg:w-1/3">
            <h2 className="font-black text-2xl text-center mb-5">
              Vous avez une demande, ou uue question ?
            </h2>
            <div className="text-center">
              <SimpleText itemKey="contact.email-and-phone" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactForm() {
  const [name, setName] = useState('');
  const [firstname, setFirstname] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');

  const submit = async () => {
    try {
      console.log('click');
      const response = await sendMail({
        name,
        firstname,
        subject,
        message,
        email,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form
        action=""
        onSubmit={e => {
          e.preventDefault();
          submit();
        }}
        className="flex flex-col gap-5"
      >
        <div className="gap-5 flex flex-col lg:flex-row">
          <div className="lg:w-1/2">
            <TextInput
              name="Nom"
              id="contact-nom"
              value={name}
              onChange={e => setName(e.currentTarget.value)}
            />
          </div>
          <div className="lg:w-1/2">
            <TextInput
              name="Prénomprenom"
              id="contact-nom"
              value={firstname}
              onChange={e => setFirstname(e.currentTarget.value)}
            />
          </div>
        </div>
        <div className="lg:flex lg:gap-5">
          <div className="lg:w-1/2">
            <TextInput
              name="Adresse email"
              id="contact-email"
              value={email}
              onChange={e => setEmail(e.currentTarget.value)}
            />
          </div>
          <div className="lg:w-1/2">
            <TextInput
              name="Objet"
              id="contact-objet"
              value={subject}
              onChange={e => setSubject(e.currentTarget.value)}
            />
          </div>
        </div>
        <div>
          <TextArea
            name="Message"
            id="contact-message"
            value={message}
            onChange={e => setMessage(e.currentTarget.value)}
          />
        </div>
        <div className="flex justify-center">
          <SubmitInput />
        </div>
      </form>
    </div>
  );
}

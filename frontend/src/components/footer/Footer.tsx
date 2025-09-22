import logo from '../../assets/logo/logo-noir.png';

export default function Footer() {
  return (
    <div className="bg-white p-10">
      <div>
        <img
          className="block m-auto w-2/3"
          src={logo}
          alt="Logo de Intercalaire Productions"
        />
      </div>
    </div>
  );
}

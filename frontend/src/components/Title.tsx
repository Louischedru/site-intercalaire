export default function Title(props: { name: string }) {
  return (
    <div className="flex justify-center">
      <h2 className="gobold bg-ip-blue text-white text-2xl inline text-center p-3 mb-5">
        {props.name}
      </h2>
    </div>
  );
}

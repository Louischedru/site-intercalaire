interface Props {
  disabled?: boolean;
}

export default function SubmitInput(props: Props) {
  return (
    <input
      type="submit"
      value="Valider"
      className="text-white bg-ip-blue p-2 disabled:bg-[#6e6e6e] disabled:text-[#d6d6d6]"
      disabled={props.disabled}
    />
  );
}

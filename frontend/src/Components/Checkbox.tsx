const Checkbox = (props: {
  label: string;
  checked: boolean;
  clicked: () => void;
}) => {
  const { label, checked, clicked } = props;
  return (
    <>
      <input
        className="checkbox"
        type="checkbox"
        onChange={clicked}
        checked={checked}
      />
      {label}
    </>
  );
};

export default Checkbox;

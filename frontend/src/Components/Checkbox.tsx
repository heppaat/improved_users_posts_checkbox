const Checkbox = (props: {
  label: string;
  checked: boolean;
  clicked: () => void;
}) => {
  const { label, checked, clicked } = props;
  return (
    <div>
      <input type="checkbox" onChange={clicked} checked={checked} />
      {label}
    </div>
  );
};

export default Checkbox;

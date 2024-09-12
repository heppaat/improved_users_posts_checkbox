import Checkbox from "./Checkbox";
import { list } from "../list";
import { useEffect, useState } from "react";

const initialState = list.reduce<{ [key: string]: boolean }>((acc, curr) => {
  acc[curr["id"]] = false;
  return acc;
}, {});

const Checkboxes = () => {
  const [checked, setChecked] = useState<{ [key: string]: boolean }>(
    initialState
  );
  const [selectAll, setSelectAll] = useState<boolean>(false);

  const handleChecked = (id: number) => {
    const updatedStates = { ...checked };
    updatedStates[id] = !checked[id];
    setChecked(updatedStates);

    const allSelected = Object.values(updatedStates).every(Boolean);
    setSelectAll(allSelected);
  };

  const handleSelectAll = () => {
    const newCheckedStatus = !selectAll;

    const updatedStates = list.reduce<{ [key: string]: boolean }>(
      (acc, curr) => {
        acc[curr.id] = newCheckedStatus;
        return acc;
      },
      {}
    );

    setChecked(updatedStates);
    setSelectAll(newCheckedStatus);
  };

  useEffect(() => {
    console.log(checked);
  }, [checked]);

  const selectedBeers = list
    .filter((item) => checked[item.id] === true)
    .map((item) => item.name);

  return (
    <>
      <Checkbox
        label={"Select all"}
        checked={selectAll}
        clicked={handleSelectAll}
      />
      {list.map((item) => (
        <Checkbox
          key={item.id}
          label={item.name}
          checked={checked[item.id]}
          clicked={() => handleChecked(item.id)}
        />
      ))}
      <p>{selectedBeers.join(", ")}</p>
    </>
  );
};

export default Checkboxes;

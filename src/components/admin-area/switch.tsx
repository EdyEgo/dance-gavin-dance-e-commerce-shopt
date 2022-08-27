import * as React from "react";
import Switch from "@mui/material/Switch";

export default function ControlledSwitches({
  checked,
  setChecked,
}: {
  checked: boolean;
  setChecked: (newValue: boolean) => void;
}) {
  //   const [checked, setChecked] = React.useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <Switch
      color="secondary"
      checked={checked}
      onChange={handleChange}
      inputProps={{ "aria-label": "controlled" }}
    />
  );
}

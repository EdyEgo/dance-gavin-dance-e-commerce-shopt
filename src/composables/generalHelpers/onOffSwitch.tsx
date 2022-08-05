import * as React from "react";

import Switch from "@mui/material/Switch";

interface OnOffSwitchProps {
  checked: boolean;
  setChecked: (newValue: boolean) => void;
}

const OnOffSwitch: React.FC<OnOffSwitchProps> = ({ checked, setChecked }) => {
  const [checkedIn, setCheckedIn] = React.useState(checked);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    setCheckedIn(event.target.checked);
  };

  return (
    <div className="on-off-switch-container">
      <Switch
        checked={checkedIn}
        onChange={handleChange}
        inputProps={{ "aria-label": "controlled" }}
      />
    </div>
  );
};

export default OnOffSwitch;

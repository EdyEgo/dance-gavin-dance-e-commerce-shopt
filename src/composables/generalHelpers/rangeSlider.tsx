import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

function valuetext(value: number) {
  return `${value}°C`;
}

export default function RangeSlider({
  availableRange,
  setValue,
  value,
}: {
  availableRange: [number, number];
  value: [number, number];
  setValue: (newValue: any) => void;
}) {
  //   const [value, setValue] = React.useState<number[]>([20, 37]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Slider
        getAriaLabel={() => "Temperature range"}
        value={value}
        min={availableRange[0]}
        max={availableRange[1]}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
      />
    </Box>
  );
}

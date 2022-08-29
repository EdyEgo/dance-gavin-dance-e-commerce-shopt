import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

export default function TabsWrappedLabel({
  children,
  setValue,
  value,
}: {
  children: any;
  value: string;
  setValue: (newValue: string) => void;
}) {
  //   const [value, setValue] = React.useState("one");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        "&: .MuiBox-root > .MuiTabs-root > .MuiTabs-scroller > .MuiTabs-indicator":
          { backgroundColor: "black" },
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        aria-label="wrapped label tabs example"
      >
        {children}
      </Tabs>
    </Box>
  );
}

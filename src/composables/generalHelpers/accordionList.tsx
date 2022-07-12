// import * as React from "react";
// import Accordion from "@mui/material/Accordion";
// import AccordionDetails from "@mui/material/AccordionDetails";
// import AccordionSummary from "@mui/material/AccordionSummary";
// import Typography from "@mui/material/Typography";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// export default function ControlledAccordions() {
//   const [expanded, setExpanded] = React.useState<string | false>(false);

//   const handleChange =
//     (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
//       setExpanded(isExpanded ? panel : false);
//     };

//   return (
//     <div>
//       <Accordion
//         expanded={expanded === "panel1"}
//         onChange={handleChange("panel1")}
//       >
//         <AccordionSummary
//           expandIcon={<ExpandMoreIcon />}
//           aria-controls="panel1bh-content"
//           id="panel1bh-header"
//         >
//           <Typography sx={{ width: "33%", flexShrink: 0 }}>
//             Product type
//           </Typography>
//           {/* <Typography sx={{ color: "text.secondary" }}>
//             I am an accordion
//           </Typography> */}
//         </AccordionSummary>
//         <AccordionDetails>
//           <Typography>a list of products</Typography>
//         </AccordionDetails>
//       </Accordion>
//       <Accordion
//         expanded={expanded === "panel2"}
//         onChange={handleChange("panel2")}
//       >
//         <AccordionSummary
//           expandIcon={<ExpandMoreIcon />}
//           aria-controls="panel2bh-content"
//           id="panel2bh-header"
//         >
//           <Typography sx={{ width: "33%", flexShrink: 0 }}>Size</Typography>
//           {/* <Typography sx={{ color: "text.secondary" }}>Size</Typography> */}
//         </AccordionSummary>
//         <AccordionDetails>
//           <Typography>available sizes checkbox</Typography>
//         </AccordionDetails>
//       </Accordion>
//       <Accordion
//         expanded={expanded === "panel3"}
//         onChange={handleChange("panel3")}
//       >
//         <AccordionSummary
//           expandIcon={<ExpandMoreIcon />}
//           aria-controls="panel3bh-content"
//           id="panel3bh-header"
//         >
//           <Typography sx={{ width: "33%", flexShrink: 0 }}>Price</Typography>
//           {/* <Typography sx={{ color: "text.secondary" }}>a price list</Typography> */}
//         </AccordionSummary>
//         <AccordionDetails>
//           <Typography>a price list</Typography>
//         </AccordionDetails>
//       </Accordion>
//       <Accordion
//         expanded={expanded === "panel4"}
//         onChange={handleChange("panel4")}
//       >
//         <AccordionSummary
//           expandIcon={<ExpandMoreIcon />}
//           aria-controls="panel4bh-content"
//           id="panel4bh-header"
//         >
//           <Typography sx={{ width: "33%", flexShrink: 0 }}>
//             Availability
//           </Typography>
//         </AccordionSummary>
//         <AccordionDetails>
//           <Typography>in stock and out of stock</Typography>
//         </AccordionDetails>
//       </Accordion>
//     </div>
//   );
// }

import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function SimpleAccordion() {
  return (
    <div className="bg-[#25c3c8]">
      <Accordion style={{ backgroundColor: "#25c3c8" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography> Product type</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>a list of products</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion style={{ backgroundColor: "#25c3c8" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Size</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>list sizes available</Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion style={{ backgroundColor: "#25c3c8" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Price</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>prise range line</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion style={{ backgroundColor: "#25c3c8" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Availability</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>in stock number and out of stock number</Typography>
        </AccordionDetails>
      </Accordion>
      {/* <Accordion disabled>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography>Disabled Accordion</Typography>
        </AccordionSummary>
      </Accordion> */}
    </div>
  );
}

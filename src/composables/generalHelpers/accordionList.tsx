import { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function SimpleAccordion({
  availabilityOptions,
  priceOptions,
  productTypeOptions,
  sizeOptions,
}: {
  productTypeOptions: any[];
  sizeOptions: any[];
  priceOptions: any[];
  availabilityOptions: any[];
}) {
  const [filtersSelected, setFiltersSelected] = useState<any>();
  // const sortBySelectedValues = useSelector(
  //   (state: any) => state.productFiltersSearch.sortBy
  // );

  function selectOptionToFilterBy(value: string) {
    // here dispatch the change in filters options , there is no need to use the store , lets just use an useState
  }

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
          {productTypeOptions.map(
            ({
              name,
              value,
              itemsNumberAvailable,
            }: {
              value: string;
              name: string;
              itemsNumberAvailable: number;
            }) => {
              return (
                <div
                  className="option"
                  onClick={() => {
                    selectOptionToFilterBy(value);
                  }}
                >
                  <div className="check-box"></div>
                  <div className="name">{name}</div>
                  <div className="items-available">
                    {"("}
                    {itemsNumberAvailable}
                    {")"}
                  </div>
                </div>
              );
            }
          )}
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
          {sizeOptions.map(
            ({
              name,
              value,
              itemsNumberAvailable,
            }: {
              value: string;
              name: string;
              itemsNumberAvailable: number;
            }) => {
              return (
                <div
                  className="option"
                  onClick={() => {
                    selectOptionToFilterBy(value);
                  }}
                >
                  <div className="check-box"></div>
                  <div className="name">{name}</div>
                  <div className="items-available">
                    {"("}
                    {itemsNumberAvailable}
                    {")"}
                  </div>
                </div>
              );
            }
          )}
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
          {priceOptions.map(
            ({
              name,
              value,
              itemsNumberAvailable,
            }: {
              value: string;
              name: string;
              itemsNumberAvailable: number;
            }) => {
              return (
                <div
                  className="option"
                  onClick={() => {
                    selectOptionToFilterBy(value);
                  }}
                >
                  <div className="check-box"></div>
                  <div className="name">{name}</div>
                  <div className="items-available">
                    {"("}
                    {itemsNumberAvailable}
                    {")"}
                  </div>
                </div>
              );
            }
          )}
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
          {availabilityOptions.map(
            ({
              name,
              value,
              itemsNumberAvailable,
            }: {
              value: string;
              name: string;
              itemsNumberAvailable: number;
            }) => {
              return (
                <div
                  className="option"
                  onClick={() => {
                    selectOptionToFilterBy(value);
                  }}
                >
                  <div className="check-box"></div>
                  <div className="name">{name}</div>
                  <div className="items-available">
                    {"("}
                    {itemsNumberAvailable}
                    {")"}
                  </div>
                </div>
              );
            }
          )}
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

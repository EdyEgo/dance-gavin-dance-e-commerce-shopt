import { useState } from "react";
import { useSelector } from "react-redux";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Checkbox from "@mui/material/Checkbox";
import { pink } from "@mui/material/colors";
import RangeSlider from "./rangeSlider";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import EuroRoundedIcon from "@mui/icons-material/EuroRounded";
import DollarRoundedIcon from "@mui/icons-material/AttachMoneyRounded";

import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";

export default function SimpleAccordion({
  availabilityOptions,
  priceRange,
  productTypeOptions,
  sizeOptions,
}: {
  productTypeOptions: {
    [key: string]: {
      value: string;
      name: string;
      itemsNumberAvailable: number;
    };
  };
  sizeOptions: {
    [key: string]: {
      value: string;
      name: string;
      itemsNumberAvailable: number;
    };
  };
  priceRange: [number, number];
  availabilityOptions: {
    inStock: { name: "In stock"; numberItems: number };
    outOfStock: { name: "Out of Stock"; numberItems: number };
  };
}) {
  const productsSelectedCurrency = useSelector(
    (state: any) => state.productFiltersSearch.selectedCurrency
  );

  const [filtersSelected, setFiltersSelected] = useState<any>(priceRange);

  const [availabilityOptionsValue, setAvailabilityOptionsValue] = useState();
  const [productTypeOptionsValue, setProductTypeOptionsValue] = useState();
  const [sizeOptionsValue, setSizeOptionsValue] = useState();

  const [rangeValue, setRangeValue] = useState(priceRange);
  // const sortBySelectedValues = useSelector(
  //   (state: any) => state.productFiltersSearch.sortBy
  // );

  function selectOptionToFilterBy(value: string) {
    // here dispatch the change in filters options , there is no need to use the store , lets just use an useState
  }

  const returnFitCurrencyIcon = () => {
    const iconsList: { [key: string]: any } = {
      euro: <EuroRoundedIcon fontSize="small" />,
      dollar: <DollarRoundedIcon fontSize="small" />,
    };
    return iconsList[productsSelectedCurrency];
  };

  // and on click on an filter option the check box to check or uncheck , not just when you press the check button
  // maybe just use icons instead of actuall radio inputs

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
          {Object.entries(productTypeOptions).map(
            ([nameProductType, { itemsNumberAvailable, name, value }]) => {
              return (
                <div
                  className="option flex gap-4 items-center"
                  onClick={() => {
                    selectOptionToFilterBy(value);
                  }}
                >
                  <div className="check-box">
                    {" "}
                    <Checkbox
                      sx={{
                        color: "black",
                        "&.Mui-checked": {
                          color: "black",
                        },
                      }}
                    />
                  </div>
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
          {Object.entries(sizeOptions).map(
            ([nameSize, { itemsNumberAvailable, name, value }]) => {
              return (
                <div
                  className="option flex gap-4 items-center"
                  onClick={() => {
                    selectOptionToFilterBy(value);
                  }}
                >
                  <div className="check-box">
                    <Checkbox
                      sx={{
                        color: "black",
                        "&.Mui-checked": {
                          color: "black",
                        },
                      }}
                    />
                  </div>
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
          {/* {Object.entries(sizeOptions).map(
           [sizeName,{}]) => {
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
          )} */}
        </AccordionDetails>
      </Accordion>

      <Accordion style={{ backgroundColor: "#25c3c8" }}>
        {/* add click outside detector on the range */}
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Price</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="price-range-container">
            <RangeSlider
              availableRange={priceRange}
              setValue={setRangeValue}
              value={rangeValue}
            />
            <div className="price-range-inputs flex gap-4">
              <div>
                <TextField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {returnFitCurrencyIcon()}
                      </InputAdornment>
                    ),
                  }}
                  type="number"
                  id="outlined-basic"
                  variant="outlined"
                />
              </div>
              <div>to</div>
              <div>
                <TextField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {returnFitCurrencyIcon()}
                      </InputAdornment>
                    ),
                  }}
                  type="number"
                  id="outlined-basic"
                  variant="outlined"
                />
              </div>
            </div>
          </div>
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
          <div className="in-stock flex gap-4 items-center">
            <div className="check-box">
              <Checkbox
                sx={{
                  color: "black",
                  "&.Mui-checked": {
                    color: "black",
                  },
                }}
              />
            </div>
            <div className="name">{availabilityOptions.inStock.name}</div>
            <div className="number-items">
              {"("}
              {availabilityOptions.inStock.numberItems}
              {")"}
            </div>
          </div>
          <div className="out-of-stock flex gap-4 items-center">
            <div className="check-box">
              <Checkbox
                sx={{
                  color: "black",
                  "&.Mui-checked": {
                    color: "black",
                  },
                }}
              />
            </div>
            <div className="name">{availabilityOptions.outOfStock.name}</div>
            <div className="number-items">
              {"("}
              {availabilityOptions.outOfStock.numberItems}
              {")"}
            </div>
          </div>
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

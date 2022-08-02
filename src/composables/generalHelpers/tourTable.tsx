import * as React from "react";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

interface Column {
  id: "name" | "code" | "population" | "size" | "density";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "code", label: "ISO\u00a0Code", minWidth: 100 },
  {
    id: "population",
    label: "Population",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "size",
    label: "Size\u00a0(km\u00b2)",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "density",
    label: "Density",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toFixed(2),
  },
];

interface Data {
  name: string;
  code: string;
  population: number;
  size: number;
  density: number;
}

function createData(name: string, code: string): any {
  return { name, code, population: "TICKETS", size: "VIP" };
}

const rows = [
  createData("India ", "IN"),
  createData("China", "CN"),
  createData("Italy", "IT"),
  createData("United States", "NY"),
  createData("Canada", "CA"),
  createData("Australia", "AU"),
  createData("Germany", "DE"),
  createData("Ireland", "IE"),
  createData("Mexico", "MX"),
  createData("Japan", "JP"),
  createData("France", "FR"),
  createData("United Kingdom", "GB"),
  createData("Romania", "RO"),
  createData("Nigeria", "NG"),
  createData("Brazil", "BR"),
];

export default function StickyHeadTable({
  backgroundPreselected,
  hovePreselected,
  buttonsPreselectedHoverEffect,
}: {
  backgroundPreselected?: string;
  hovePreselected?: string;
  buttonsPreselectedHoverEffect?: string;
}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%" }}>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table" style={{ border: "" }}>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow
                    className={`${
                      backgroundPreselected != null
                        ? backgroundPreselected
                        : "bg-[#E84A42]"
                    } ${
                      hovePreselected != null
                        ? hovePreselected
                        : "hover:bg-red-500"
                    }`}
                    role="checkbox"
                    tabIndex={-1}
                    key={row.code}
                    style={{ border: "transparent" }}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];

                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{
                            color: "white",
                            border: "transparent",
                            fontSize: "1.225rem",
                          }}
                        >
                          {value === "TICKETS" || value === "VIP" ? (
                            <div className="action-button flex justify-end">
                              <a
                                href="https://www.ticketmaster.com/event/09005CD6ADB650FF?irgwc=1&clickid=yakXqGSNrxyITSM23oyBG2qwUkD1qRUpmw9%3A240&camefrom=CFC_BUYAT_219208&impradid=219208&REFERRAL_ID=tmfeedbuyat219208&wt.mc_id=aff_BUYAT_219208&utm_source=219208-Bandsintown&impradname=Bandsintown&utm_medium=affiliate&ircid=4272"
                                className={`btn border border-white py-2 px-16 cursor-pointer ${
                                  buttonsPreselectedHoverEffect != null
                                    ? buttonsPreselectedHoverEffect
                                    : "hover:bg-red-600"
                                } hover:border-gray-200 transition-all ease-out`}
                              >
                                {value}
                              </a>
                            </div>
                          ) : (
                            <div className="no-action">{value}</div>
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

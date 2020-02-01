import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { in_to_px } from "../dynamicGearViewer/gearUtils";

const r = num => {
    return (Math.round(num * 100) * 100) / 10000;
};

const ViewGearAttributes = ({ context }) => {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        const fn = () => {
            setRows([
                { name: "Addendum", formula: "(1 / P)", value: r(context.a / in_to_px), unit: '"' },
                { name: "Dedendum", formula: "(1.25 / P)", value: r(context.b / in_to_px), unit: '"' },
                {
                    name: "Base Diameter",
                    formula: "Pitch Diameter * cos(pa)",
                    value: r(context.db / in_to_px),
                    unit: '"',
                },
                { name: "Pitch Diameter", formula: "(N / P)", value: r(context.dp / in_to_px), unit: '"' },
                { name: "Circular Pitch", formula: "(3.1415 / P)", value: r(context.p), unit: "°" },
            ]);
        };

        fn();
        context.addEventListener("onGearUpdated", fn);
        return () => {
            context.removeEventListener("onGearUpdated", fn);
        };
    }, []);

    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Attribute</TableCell>
                        <TableCell>Formula</TableCell>
                        <TableCell align="right">Value</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map(row => (
                        <TableRow key={row.name}>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {row.formula}
                            </TableCell>
                            <TableCell align="right">
                                {row.value}
                                {row.unit}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export { ViewGearAttributes };

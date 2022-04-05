import React from "react";
import './TableData.css'
const TableData = (props) => {
  return (
    <tr>
      <td>{props.id}</td>
      <td>{props.name}</td>
      <td>{props.trips}</td>
      <td>{props.airName}</td>
      <td>{props.country}</td>
      <td>{props.website}</td>
    </tr>
  );
};
export default TableData;

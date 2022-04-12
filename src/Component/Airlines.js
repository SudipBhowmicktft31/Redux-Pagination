import React from "react";
import { useSelector } from "react-redux";
import LoadingAirlines from "../UI/LoadingAirlines";
import TableData from "../UI/TableData";
import "./Airlines.css";
const Airlines = () => {
  const isloading = useSelector((state) => state.Reducer.isLoadingSpinner);
  const airlines = useSelector((state) => state.Reducer.userData);
  const currentPage = useSelector((state) => state.Reducer.currentPage);
  let sendData = [];
  if (airlines[currentPage]) {
    sendData = airlines[currentPage];
  }
  return (
    <div>
      {isloading && <LoadingAirlines />}
      {!isloading && (
        <table className="center">
          <tr>
            <th>Sl_No.</th>
            <th>Name</th>
            <th>Trips</th>
            <th>Airline Name</th>
            <th>Country</th>
            <th>Website</th>
          </tr>
          {sendData.map((airline, index) => {
            // console.log(airline);
            return (
              <TableData
                key={index}
                uniqueId={index}
                id={currentPage * 10 + index + 1}
                name={airline.name}
                trips={airline.trips}
                airName={airline.airlinesName}
                website={airline.airlinesWebsite}
                country={airline.country}
              />
            );
          })}
        </table>
      )}
    </div>
  );
};
export default Airlines;

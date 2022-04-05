import React, { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../UI/Card";
import "./Pagination.css";
import { loadingSpinner, FetchData } from "./Redux/Actions";
//Initial State
const initialState = {
  startIndex: 1,
  endIndex: 10,
  currentPage: 1,
};

//Reducer Function for Pagination
const paginationReducer = (state, action) => {
  switch (action.type) {
    case "previous":
      return {
        startIndex: state.startIndex - 1,
        endIndex: state.endIndex - 1,
        currentPage: state.currentPage - 1,
      };
    case "next":
      return {
        startIndex: state.startIndex + 1,
        endIndex: state.endIndex + 1,
        currentPage: state.currentPage + 1,
      };
    case "selected":
      return {
        ...state,
        currentPage: action.payload,
      };
    default:
      return state;
  }
};

const Pagination = () => {
  const [prevDisable, setPrevDisable] = useState(false);
  const [nextDisable, setNextDisable] = useState(false);
  const [state, paginationDispatch] = useReducer(
    paginationReducer,
    initialState
  );
  const dispatch = useDispatch();
  const totalPage = useSelector((state) => state.Reducer.totalPage);
  // const userData = useSelector((state) => state.Reducer.userData);
  const pages = [];

  const fetchData = async (page) => {
    dispatch(loadingSpinner(true));
    const response = await fetch(
      `https://api.instantwebtools.net/v1/passenger?page=${page}&size=10`
    );
    const responseData = await response.json();

    const loadedAirlineData = [];
    for (const key in responseData.data) {
      loadedAirlineData.push({
        id: key,
        name: responseData.data[key].name,
        trips: responseData.data[key].trips,
        airlinesWebsite: responseData.data[key].airline[0].website,
        airlinesName: responseData.data[key].airline[0].name,
        country: responseData.data[key].airline[0].country,
      });
    }
    const airlineData = {
      data: loadedAirlineData,
      totalPage: responseData.totalPages,
      currentPage: page - 1,
    };
    dispatch(FetchData(airlineData));
    if (response.ok) {
      dispatch(loadingSpinner(false));
    }
  };
  useEffect(() => {
    fetchData(state.currentPage);
  });
  useEffect(() => {
    if (state.currentPage === 1) {
      setPrevDisable(true);
    }
    if (state.currentPage === totalPage - 1) {
      setNextDisable(true);
    } else {
      setPrevDisable(false);
      setNextDisable(false);
    }
  }, [state.currentPage]);

  const prevBtnHandler = () => {
    paginationDispatch({ type: "previous" });
    fetchData(state.startIndex);
  };
  const nextBtnHandler = () => {
    paginationDispatch({ type: "next" });
    fetchData(state.startIndex);
  };
  for (let i = state.startIndex; i <= state.endIndex; i++) {
    pages.push(i); //array of total number of pages
  }
  const paginate = (pageNumber) => {
    paginationDispatch({ type: "selected", payload: pageNumber });
    fetchData(pageNumber);
  };
  return (
    <Card>
      <div className="pagination">
        <button disabled={prevDisable} onClick={prevBtnHandler}>
          Previous
        </button>
        {(state.currentPage >= 3 && !state.currentPage===totalPage-1) && (
          <li>
            <a 
            className={state.currentPage === 1  ? "active" : ""}
            href='!#'
            onClick={() => paginate(1)}>1...</a>
          </li>
        )}
        {pages.map((number) => (
          <li key={number}>
            <a
              className={state.currentPage === number ? "active" : ""}
              onClick={() => paginate(number)}
              href="!#"
            >
              {number}
            </a>
          </li>
        ))}
        <li>
          <a
            className={state.currentPage === totalPage - 1 ? "active" : ""}
            onClick={() => paginate(totalPage - 1)}
            href="!#"
          >
            ...{totalPage - 1}
          </a>
        </li>
        <button onClick={nextBtnHandler} disabled={nextDisable}>
          Next
        </button>
      </div>
    </Card>
  );
};
export default Pagination;
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
    case "first":
      return {
        startIndex: action.payload,
        endIndex: action.payload + 10,
        currentPage: state.currentPage,
      };
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
        startIndex: action.payload,
        endIndex: action.payload + 10,
        currentPage: action.payload,
      };

    case "last":
      return {
        startIndex: action.payload - 10,
        endIndex: action.payload - 1,
        currentPage: state.currentPage,
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
  const userData = useSelector((state) => state.Reducer.userData);
  const pages = [];

  const fetchData = async (page) => {
    dispatch(loadingSpinner(true));
    const response = await fetch(
      `https://api.instantwebtools.net/v1/passenger?page=${page}&size=10`
    );
    const responseData = await response.json();

    const loadedAirlineData = [];
    if (responseData.data) {
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
  }, []);
  useEffect(() => {
    if (state.currentPage <= 1) {
      setNextDisable(false);
      setPrevDisable(true);
    } else if (state.currentPage === totalPage - 1) {
      setNextDisable(true);
      setPrevDisable(false);
    } else {
      setPrevDisable(false);
      setNextDisable(false);
    }
  }, [state.currentPage]);

  const prevBtnHandler = () => {
    paginationDispatch({ type: "previous" });
    // fetchData(state.startIndex - 1);
    paginate(state.startIndex - 1);
  };
  const nextBtnHandler = () => {
    paginationDispatch({ type: "next" });
    // fetchData(state.startIndex + 1);
    paginate(state.startIndex + 1);
  };
  for (let i = state.startIndex; i <= state.endIndex; i++) {
    pages.push(i); //array of total number of pages
  }
  const paginate = (pageNumber) => {
    paginationDispatch({ type: "selected", payload: pageNumber });

    if (userData[pageNumber - 1]) {
      const newData = {
        data: userData[pageNumber - 1],
        totalPage: totalPage,
        currentPage: pageNumber - 1,
      };
      dispatch(FetchData(newData));
    } else {
      fetchData(pageNumber);
    }
  };
  const firstNavigate = (page) => {
    paginate(page);
    paginationDispatch({ type: "first", payload: page });
  };
  const lastNavigate = (page) => {
    paginate(page);
    paginationDispatch({ type: "last", payload: totalPage });
    // fetchData(page);
  };
  return (
    <div>
      <div className="pagination">
        <button disabled={prevDisable} onClick={prevBtnHandler}>
          Previous
        </button>
        {state.currentPage > 10 && (
          <li>
            <div
              className={state.currentPage === 1 ? "active" : ""}
              onClick={() => firstNavigate(1)}
            >
              1...
            </div>
          </li>
        )}
        {pages.map((number) => (
          <li key={number}>
            <div
              className={state.currentPage === number ? "active" : ""}
              onClick={() => paginate(number)}
            >
              {number}
            </div>
          </li>
        ))}
        {state.currentPage !== totalPage - 1 && (
          <li>
            <div
              className={state.currentPage === totalPage - 1 ? "active" : ""}
              onClick={() => lastNavigate(totalPage - 1)}
            >
              ...{totalPage - 1}
            </div>
          </li>
        )}
        <button onClick={nextBtnHandler} disabled={nextDisable}>
          Next
        </button>
      </div>
    </div>
  );
};
export default Pagination;

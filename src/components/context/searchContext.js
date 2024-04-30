import React, { createContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
export const searchContext = createContext();
export default function SearchProvider({ children }) {
  const [meetings, setMeetings] = useState([]);
  let [isLoading, setIsLoading] = useState(true);

  async function getMeetings() {
 
    const { data } = await axios.get(
      `${process.env.REACT_APP_APIHOST}/meetings?date[gte]=${
        new Date().toISOString().split("T")[0]
      }&sort=date`,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );

    if (data.success) {
      setMeetings(data);
      setIsLoading(false);
    }
  }

  async function searchMeet(val) {
    const { data } = await axios.get(
      `${process.env.REACT_APP_APIHOST}/meetings?about=${val}&address=${val}&person=${val}`,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    if (data.success) {
      setMeetings(data);
    }
  }
  return (
    <searchContext.Provider
      value={{ meetings, isLoading, searchMeet, getMeetings }}
    >
      {children}
    </searchContext.Provider>
  );
}

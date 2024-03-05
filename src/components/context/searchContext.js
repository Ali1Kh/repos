import React, { createContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
export const searchContext = createContext();
export default function SearchProvider({ children }) {
  
  const [meetings, setMeetings] = useState([]);
  //   let { isLoading } = useQuery("getMeetings", getMeetings);

  const authToken = localStorage.getItem("token");

  useEffect(() => {
    getMeetings();
  }, []);

  async function getMeetings() {
    if (!authToken) {
      console.error("Authentication token not found in Local Storage");
      return;
    }

    const { data } = await axios.get(
      "https://meetingss.onrender.com/meetings/",
      {
        headers: {
          token: authToken,
        },
      }
    );

    if (data.success) {
      setMeetings(data);
    }
  }

  async function search(val) {
    const { data } = await axios.get(
      `https://meetingss.onrender.com/meetings?person=${val}`,
      {
        headers: {
          token: authToken,
        },
      }
    );
    console.log("? > ", data);
    if (data.success) {
      setMeetings(data);
      console.log(">>>>>>>", meetings);
    }
  }

  return (
    <searchContext.Provider value={{ meetings, search }}>
      {children}
    </searchContext.Provider>
  );
}

import React, { createContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
export const searchContext = createContext();
export default function SearchProvider({ children }) {
  
  const [meetings, setMeetings] = useState([]);
    let { isLoading } = useQuery("getMeetings", getMeetings);
 
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
      "https://meetingss.onrender.com/meetings?sort=date",
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

  async function searchMeet(val) {
    const { data } = await axios.get(
      `https://meetingss.onrender.com/meetings?about=${val}&address=${val}&person=${val}`,
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
  return (
    <searchContext.Provider value={{ meetings,isLoading, searchMeet }}>
      {children}
    </searchContext.Provider>
  );
}

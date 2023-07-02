"use client";

import Add from "@/components/Add";
import Navbar from "@/components/Navbar";
import Tabs from "@/components/Tabs";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    try {
      const response = await fetch("/api/todos");
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.log("Error fetching data:", error);
      // Handle error
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const refresh = () => {
    fetchData();
  };
  return (
    <>
      <Navbar />
      <h1 className="text-4xl font-semibold p-10 mt-10">Add Task</h1>
      <Add refresh={refresh} />
      <h1 className="text-4xl font-semibold p-10 mt-10">To-Dos</h1>
      <Tabs data={data} />
      <div className="mb-10"></div>
    </>
  );
}

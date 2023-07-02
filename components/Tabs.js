"use client"

import React, { useEffect, useState } from "react";

const Tabs = ({ data }) => {
    const [added, setAdded] = useState(false);
    const [tasks, setTasks] = useState(data)
    const [searchQuery, setSearchQuery] = useState("")
    const [searchData, setsearchData] = useState([])
    const handleChange =async e => {
        setSearchQuery(e.target.value)
        try {
          const response = await fetch("/api/search", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
              body: JSON.stringify({
                  "title": searchQuery
            }),
          });
            setsearchData(await response.json())
            if (searchQuery === "") {
                setsearchData([])
            }
        } catch (error) {
          console.log("Error creating post:", error);
          // Handle error
        }
    }
    const deletetask = async title => {
          try {
            const response = await fetch("/api/delete", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
                body: JSON.stringify({
                    "title": title
              }),
            });
              const updatedData = tasks.filter((item) => item.title !== title);
              setTasks(updatedData)
              setAdded(true)
              setTimeout(() => {
                setAdded(false)
              }, 2000);
          } catch (error) {
            console.log("Error creating post:", error);
            // Handle error
          }
    }
    useEffect(() => {
      setTasks(data)
    }, [data])
    
  return (
      <>
      {added && (
        <div
          class="max-w-xs bg-white fixed bottom-2 right-2 z-50 border rounded-md shadow-2xl dar:bg-gray-800 dar:border-gray-700"
          role="alert"
        >
          <div class="flex p-4">
            <div class="flex-shrink-0">
              <svg
                class="h-4 w-4 text-green-500 mt-0.5"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
              </svg>
            </div>
            <div class="ml-3">
              <p class="text-sm text-gray-700 dar:text-gray-400">
                Task removed Successfully!.
              </p>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col p-2 mx-10 rounded-xl">
        <div className="-m-1.5 overflow-x-auto bg-white rounded-xl">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="border rounded-lg divide-y divide-gray-200 dar:border-gray-700 dar:divide-gray-700">
              <div className="py-3 px-4">
                <div className="relative max-w-xs">
                  <label htmlFor="hs-table-search" className="sr-only">
                    Search
                  </label>
                  <input
                    type="text"
                    name="hs-table-search"
                    id="hs-table-search"
                    className="p-3 pl-10 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dar:bg-slate-900 dar:border-gray-700 dar:text-gray-400"
                    placeholder="Search for items"
                    onChange={handleChange}
                    value={searchQuery}
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none pl-4">
                    <svg
                      className="h-3.5 w-3.5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                    </svg>
                  </div>
                </div>
              </div>
              <table className="bg-blue-50 p-2 rounded-xl w-full">
                {searchQuery != "" && searchData.map((task) => {
                      return (
                        <tr key={task._id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dar:text-gray-200">
                            {task.title}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => deletetask(task.title)}
                              className="text-blue-500 hover:text-blue-700"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
              </table>
              <div className="overflow-hidden ">
                <table className="min-w-full divide-y divide-gray-200 dar:divide-gray-700">
                  <thead className="bg-gray-50 dar:bg-gray-700">
                    <tr>
                      <th scope="col" className="py-3 px-4 pr-0">
                        <div className="flex items-center h-5">
                          <input
                            id="hs-table-search-checkbox-all"
                            type="checkbox"
                            className="border-gray-200 rounded text-blue-600 focus:ring-blue-500 dar:bg-gray-800 dar:border-gray-700 dar:checked:bg-blue-500 dar:checked:border-blue-500 dar:focus:ring-offset-gray-800"
                          />
                          <label
                            htmlFor="hs-table-search-checkbox-all"
                            className="sr-only"
                          >
                            Completed
                          </label>
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                      >
                        Task
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase"
                      >
                        Delete
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dar:divide-gray-700">
                    {tasks.map((task) => {
                      return (
                        <tr key={task._id}>
                          <td className="py-3 pl-4">
                            <div className="flex items-center h-5">
                              <input
                                id="hs-table-search-checkbox-1"
                                type="checkbox"
                                className="border-gray-200 rounded text-blue-600 focus:ring-blue-500 dar:bg-gray-800 dar:border-gray-700 dar:checked:bg-blue-500 dar:checked:border-blue-500 dar:focus:ring-offset-gray-800"
                              />
                              <label
                                htmlFor="hs-table-search-checkbox-1"
                                className="sr-only"
                              >
                                Checkbox
                              </label>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dar:text-gray-200">
                            {task.title}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => deletetask(task.title)}
                              className="text-blue-500 hover:text-blue-700"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tabs;

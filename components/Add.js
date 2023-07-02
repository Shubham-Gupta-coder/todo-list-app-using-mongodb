"use client"
import React, { useState } from 'react'

const Add = ({refresh}) => {
    const [todo, setTodo] = useState("")
    const [added, setAdded] = useState(false)
    const handleChange = e => {
        setTodo(e.target.value)
    }
    const addTodo = async (e) => {
        e.preventDefault()
          try {
            const response = await fetch("/api/todos", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
                body: JSON.stringify({
                    "title": todo
              }),
            });
              setTodo("")
              refresh()
              setAdded(true)
              setTimeout(() => {
                setAdded(false)
              }, 2000);
          } catch (error) {
            console.log("Error creating post:", error);
            // Handle error
          }
    }
  return (
      <>
          {added && <div class="max-w-xs bg-white fixed bottom-2 right-2 z-50 border rounded-md shadow-2xl dar:bg-gray-800 dar:border-gray-700" role="alert">
  <div class="flex p-4">
    <div class="flex-shrink-0">
      <svg class="h-4 w-4 text-green-500 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
      </svg>
    </div>
    <div class="ml-3">
      <p class="text-sm text-gray-700 dar:text-gray-400">
        Task added Successfully!.
      </p>
    </div>
  </div>
</div>}
      <form className="mx-10">
        <div className="flex rounded-md shadow-sm ">
          <span className="px-4 inline-flex items-center min-w-fit rounded-l-md border border-r-0 border-gray-200 bg-gray-50 text-sm text-gray-500 dar:bg-gray-700 dar:border-gray-700 dar:text-gray-400">
            To-Do:
          </span>
          <input
            type="text"
                      className="py-5 px-3 pr-11 block w-full border-gray-200 shadow-sm rounded-r-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 dar:bg-slate-900 dar:border-gray-700 dar:text-gray-400"
                      value={todo}
                      onChange={handleChange}
          />
        </div>
        <input
          type="submit"
                  className="w-full py-4 mt-2 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dar:bg-slate-900 dar:hover:bg-slate-800 dar:border-gray-700 dar:text-gray-400 dar:hover:text-white dar:focus:ring-offset-gray-800 cursor-pointer"
                  onClick={addTodo}
                  value={"Add Task"}
        />
      </form>
    </>
  );
}

export default Add
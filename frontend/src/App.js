import { useState,useEffect } from "react";
import Pagination from "./Pagination";
import axios from 'axios';

function App() {
  const [value, setValue] = useState("");
  const [data,setData]= useState([]);
  const [perPage]=useState(10);
  const [pageCount,setPageCount]=useState(0);

 
  const handlePageClick=async(e)=>{
    try {
      const response = await axios.get(
        `http://localhost:3000/v1/search?Search=${value}&page=${e.selected+1}`
      );
      
      if (response.data.status) {
       setData(response.data.data);     
       const d=response.data.count;
       setPageCount(Math.ceil(d/ perPage))
       console.log("page===>",pageCount)
      } else {
       alert("Not able to fetch");
      }
    } catch (error) {
      console.log(error);
      alert("Error");
    }
  }
  async function heandleSearch() {
    try {
      const response = await axios.get(
        `http://localhost:3000/v1/search?Search=${value}&page=1`
      );
      
      if (response) {
       setData(response.data.data);
       const d=response.data.count;
       setPageCount(Math.ceil(d/ perPage))
      } else {
       alert("Not able to fetch");
      }
    } catch (error) {
      console.log(error);
      alert("Error");
    }
  }
  useEffect(() => {
    console.log(data);
  }, [data]); 



  return (
    

    <div className="bg-gray-300 w-screen h-screen flex flex-col">  
    <div className="relative w-[30rem] ">
        <div className="flex flex-row gap-2">
        <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Any Element" required   onChange={(e) => setValue(e.target.value)}/>
        <button type="submit" className="text-white  end-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={heandleSearch}
        >Search</button>
        </div>
      </div>
      <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Item List</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 py-2 px-4">Level</th>
            <th className="border border-gray-300 py-2 px-4">ResourceId</th>
            <th className="border border-gray-300 py-2 px-4">timestamp</th>
            <th className="border border-gray-300 py-2 px-4">traceId</th>
            <th className="border border-gray-300 py-2 px-4">spanId</th>
            <th className="border border-gray-300 py-2 px-4">commit</th>
            <th className="border border-gray-300 py-2 px-4">metadata.parentResourceId</th>
            <th className="border border-gray-300 py-2 px-4">Message</th>

          </tr>
        </thead>
        <tbody>
          {data && data.map((item) => (
            <tr key={item.id} className="border-t border-gray-300">
              <td className="border border-gray-300 py-2 px-4">{item.level}</td>
              <td className="border border-gray-300 py-2 px-4">{item.resourceId}</td>
              <td className="border border-gray-300 py-2 px-4">{item.timestamp}</td>
              <td className="border border-gray-300 py-2 px-4">{item.traceId}</td>
              <td className="border border-gray-300 py-2 px-4">{item.spanId}</td>
              <td className="border border-gray-300 py-2 px-4">{item.commit}</td>
              <td className="border border-gray-300 py-2 px-4">{item.metadata.parentResourceId}</td>
              <td className="border border-gray-300 py-2 px-4">{item.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div className="">
  <Pagination handlePageClick={handlePageClick} pageCount={pageCount} />
</div>
      
    </div>
  );
}

export default App;

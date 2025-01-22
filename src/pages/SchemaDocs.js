import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar2";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";

export default function SchemaDocs() {
  const [docs, setDocs] = useState([]);
  const [headers, setHeaders] = useState([]);
  const { schema_id } = useParams();

  useEffect(() => {
    const backendURL = process.env.REACT_APP_BACKEND_URL;
    fetch(`${backendURL}api/v1/getAllDocs/${schema_id}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setDocs(data.data);
          // Dynamically set headers based on the keys of the first document
          if (data.data.length > 0) {
            setHeaders(Object.keys(data.data[0]));
          }
        } else {
          alert(data.message);
        }
      })
      .catch((err) => console.log(err));
  }, [schema_id]);

  return (
    <div className="h-screen bg-auth-bg flex flex-col">
      <Navbar />
      <div className="bg-auth-bg flex-grow p-6">
        <h1 className="text-2xl text-white font-bold mb-4">Schema Documents</h1>
        <div className="overflow-x-auto">
          <table className="table-auto w-full border text-white border-gray-300">
            <thead>
              <tr>
                {headers.map((header, index) => (
                  <th
                    key={index}
                    className="px-4 py-2 border bg-black bg-opacity-10"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {docs.map((doc, rowIndex) => (
                <tr key={rowIndex}>
                  {headers.map((header, colIndex) => (
                    <td
                      key={colIndex}
                      className="px-4 py-2 whitespace-nowrap border border-gray-300"
                    >
                      {JSON.stringify(doc[header]) || "-"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
}

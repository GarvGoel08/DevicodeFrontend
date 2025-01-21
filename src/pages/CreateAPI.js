import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar2";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";

export default function CreateAPI() {
  const { project_id } = useParams(); // Get the project ID from the URL
  const [schemas, setSchemas] = useState([]); // Store schemas fetched using the project ID
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch schemas using project ID
    fetch(
      `${process.env.REACT_APP_BACKEND_URL}api/v1/getUserSchemas?project_id=${project_id}`,
      {
        method: "GET",
        credentials: "include",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setSchemas(data.schemas);
        } else {
          console.error("Failed to fetch schemas:", data.message);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching schemas:", err);
        setLoading(false);
      });
  }, [project_id]);

  if (loading) {
    return <div className="text-center mt-10 text-lg">Loading...</div>;
  }

  if (schemas.length === 0) {
    return (
      <div className="text-center mt-10 text-lg">
        No schemas found for this project.
      </div>
    );
  }

  return (
    <div className="h-screen bg-auth-bg flex flex-col">
      <Navbar />
      <div className="flex-grow sm:px-8 px-2 p-8 bg-auth-bg">
        <div className="bg-main-bg rounded-lg p-8 text-text-light shadow-lg max-w-6xl mx-auto">
          <h1 className="sm:text-4xl text-3xl font-bold mb-6 text-theme-color-primary">
            API Documentation
          </h1>
          <p className="text-lg text-text-normal mb-8">
            This page provides auto-generated documentation for all APIs
            associated with the schemas in this project. This API is Live and
            can be used to make requests to the backend.
          </p>

          {schemas.map((schema, idx) => (
            <div
              key={idx}
              className="border border-border-light rounded-lg p-6 mb-8 bg-black bg-opacity-10 overflow-x-auto"
            >
              <h2 className="text-2xl font-bold text-theme-color-secondary mb-4">
                {schema.schema_name}
              </h2>
              <p className="text-lg mb-2">
                <div className="flex flex-row justify-between items-center">
                  <strong>Base Route:</strong>
                  {/* Copy Button */}
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `https://apidevicode.vercel.app/dynamic/${schema._id}`
                      );
                      alert("Copied to clipboard!");
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 ml-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  </button>
                </div>{" "}
                <code className="block mt-1 overflow-x-auto bg-black bg-opacity-25 py-2 px-4 rounded-xl">
                  https://apidevicode.vercel.app/dynamic/{schema._id}
                </code>
              </p>

              {/* API Endpoints */}
              <div className="mt-4">
                <h3 className="text-xl font-bold mb-2">Endpoints</h3>
                <div className="flex flex-col gap-3">
                  {schema.methodsList.map((method, methodIdx) => (
                    <div
                      key={methodIdx}
                      className="bg-black bg-opacity-10 rounded-lg shadow-lg p-4"
                    >
                      <p className="text-lg">
                        <strong>Method:</strong> {method.method}
                      </p>
                      <p className="text-lg">
                        <strong>Route:</strong> {method.route_name}
                      </p>
                      <p className="text-lg">
                        <strong>Payload:</strong>
                      </p>
                      <div className="ml-3">
                        <code>
                          {/* Fields for CREATE/UPDATE */}
                          {(method.method === "CREATE" ||
                            method.method === "UPDATE") && (
                            <div>
                              <div className="font-bold">Body:</div>
                              {schema?.fields.map((field, fieldIdx) => (
                                <div key={fieldIdx} className="ml-4">
                                  {field.name}
                                  {field.isRequired ? " (Required)" : ""}
                                </div>
                              ))}
                            </div>
                          )}
                        </code>

                        {/* Restrictions by location */}
                        {["body", "query", "cookies", "headers"].map(
                          (location) => {
                            const locationRestrictions =
                              method.restrictions.filter(
                                (res) => res.location === location
                              );
                            if (locationRestrictions.length === 0) return null;

                            return (
                              <div key={location}>
                                <code>
                                  <div className="font-bold capitalize mt-2">
                                    {location.charAt(0).toUpperCase() +
                                      location.slice(1)}
                                    :
                                  </div>
                                  {locationRestrictions.map(
                                    (restriction, restrictionIdx) => (
                                      <div
                                        key={restrictionIdx}
                                        className="ml-4"
                                      >
                                        {restriction.attribute_name}
                                        {" (Required)"}
                                      </div>
                                    )
                                  )}
                                </code>
                              </div>
                            );
                          }
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

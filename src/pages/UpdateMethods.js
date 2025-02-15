import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar2";
import Footer from "../components/Footer";
import { useParams, useNavigate } from "react-router-dom";

export default function UpdateMethods() {
  const navigate = useNavigate();
  const { schema_id, project_id } = useParams(); // Get schema and project IDs from URL
  const [methodsList, setMethodsList] = useState([]);
  const [methodInput, setMethodInput] = useState({
    method: "CREATE",
    route_name: "",
    restrictions: [],
    sendToken: false,
    tokenName: "",
    expireInDays: 1,
  });
  const [schemas, setSchemas] = useState([]); // Relevant schemas of the project
  const [currentSchemaFields, setCurrentSchemaFields] = useState([]); // Fields of the current schema
  const [relevantSchemaFields, setRelevantSchemaFields] = useState([]); // Fields of the selected relevant schema
  const [restrictionInput, setRestrictionInput] = useState({
    type: "SAME_SCHEMA",
    related_schema_name: "",
    field_name: "",
    location: "body",
    attribute_name: "",
    related_schema_id: {
      location: "body",
      attribute_name: "",
    },
  });

  const methodTypes = ["CREATE", "READ", "UPDATE", "DELETE"];
  const locations = ["query", "body", "cookies", "headers"];

  useEffect(() => {
    // Fetch current schema fields
    fetch(`${process.env.REACT_APP_BACKEND_URL}api/v1/getSchema/${schema_id}`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) =>{
        setMethodsList(data.schema.methodsList)
        setCurrentSchemaFields(data.schema.fields || [])
      }
    );

    // Fetch all schemas in the project
    fetch(
      `${process.env.REACT_APP_BACKEND_URL}api/v1/getUserSchemas?project_id=${project_id}`,
      {
        method: "GET",
        credentials: "include",
      }
    )
      .then((res) => res.json())
      .then((data) => setSchemas(data.schemas || []));
  }, [schema_id, project_id]);

  const handleRelevantSchemaChange = (schemaName) => {
    setRestrictionInput({
      ...restrictionInput,
      related_schema_name: schemaName,
      field_name: "",
    });
    const selectedSchema = schemas.find(
      (schema) => schema.schema_name === schemaName
    );
    setRelevantSchemaFields(selectedSchema ? selectedSchema.fields : []);
  };

  const handleAddRestriction = () => {
    if (
      !restrictionInput.type ||
      !restrictionInput.attribute_name ||
      !restrictionInput.location
    ) {
      alert("Restriction type, location, and attribute name are required!");
      return;
    }

    setMethodInput({
      ...methodInput,
      restrictions: [...methodInput.restrictions, restrictionInput],
    });

    setRestrictionInput({
      type: "SAME_SCHEMA",
      related_schema_name: "",
      field_name: "",
      location: "body",
      attribute_name: "",
      related_schema_id: {
        location: "body",
        attribute_name: "",
      },
    });
  };

  const handleAddMethod = () => {
    if (!methodInput.method || !methodInput.route_name) {
      alert("Method type and route name are required!");
      return;
    }
    setMethodsList([...methodsList, methodInput]);
    setMethodInput({
      method: "CREATE",
      route_name: "",
      restrictions: [],
      sendToken: false,
      tokenName: "",
      expireInDays: 1,
    });
  };

  const handleSubmit = () => {
    if (methodsList.length === 0) {
      alert("At least one method is required!");
      return;
    }

    setMethodsList((prevList) =>
      prevList.map((method) => ({
        ...method,
        route_name: method.route_name.replace("/", "").replace(/\b\w/g, (char) => char.toUpperCase()),
      }))
    );

    fetch(
      `${process.env.REACT_APP_BACKEND_URL}api/v1/updateSchema/${schema_id}`,
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ methodsList }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert("Methods added successfully!");
          navigate(`/dashboard/schema/${project_id}`);

        } else {
          alert(data.message || "Failed to add methods");
        }
      })
      .catch((err) => console.error(err));
  };

  const handleDeleteMethod = (index)=>{

    setMethodsList(prev=>prev.filter((item,ind)=>ind  !== index))

  }

  const handleEditMethod = (index) => {
    const CurrMethod = methodsList[index];
    setMethodInput(CurrMethod);
    setMethodsList(prev=>prev.filter((item,ind)=>ind  !== index))
    
  }

  const handleEditRestriction = (index) => {
    const currRest = methodInput.restrictions[index]
    setRestrictionInput(currRest);
    setMethodInput(prev=>{
      return {
        ...prev,
        restrictions: prev.restrictions.filter((item,idx)=>idx!==index)
      }
    })

  }

  const handleDeleteRestriction = (index) => {
    
    setMethodInput(prev=>{
      return {
        ...prev,
        restrictions: prev.restrictions.filter((item,idx)=>idx!==index)
      }
    })
    
  }


  useEffect(() => {
    if (methodInput.method === "CREATE") {
        setRestrictionInput((prev) => ({
            ...prev,
            type: "RELEVANT_SCHEMA",
        }));
    }
  }, [methodInput.method]);

  return (
    <div className="h-screen bg-auth-bg flex flex-col">
      <Navbar />
      <div className="flex-grow p-8 bg-auth-bg">
        <div className="bg-main-bg rounded-lg p-8 text-text-light shadow-lg max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Add Methods</h1>
          {/* Method Input Section */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Define a Method</h2>
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="w-full">
                  <label className="block text-lg font-semibold mb-2">
                    Method Type
                  </label>
                  <select
                    className="w-full bg-auth-bg p-4 py-2 rounded-lg border border-text-light focus:outline-none focus:shadow-outline focus:border-theme-color-primary transition-all duration-300 ease-in-out"
                    value={methodInput.method}
                    onChange={(e) =>
                      setMethodInput({ ...methodInput, method: e.target.value })
                    }
                  >
                    {methodTypes.map((type, idx) => (
                      <option key={idx} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-full">
                  <label className="block text-lg font-semibold mb-2">
                    Route Name
                  </label>
                  <input
                    type="text"
                    className="w-full bg-auth-bg p-4 py-2 rounded-lg border border-text-light focus:outline-none focus:shadow-outline focus:border-theme-color-primary transition-all duration-300 ease-in-out"
                    placeholder="/api/v1/example"
                    value={methodInput.route_name}
                    onChange={(e) =>
                      setMethodInput({
                        ...methodInput,
                        route_name: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <div className="w-full">
                  <label className="block text-lg font-semibold mb-2">
                    Send Token
                  </label>
                  {/* Select containing only true and false */}
                  <select
                    className="w-full bg-auth-bg p-4 py-2 rounded-lg border border-text-light focus:outline-none focus:shadow-outline focus:border-theme-color-primary transition-all duration-300 ease-in-out"
                    value={methodInput.sendToken}
                    onChange={(e) =>
                      setMethodInput({
                        ...methodInput,
                        sendToken: e.target.value === "true",
                      })
                    }
                  >
                    <option value="true">True</option>
                    <option value="false">False</option>
                  </select>
                </div>
                <div className="w-full">
                  <label className="block text-lg font-semibold mb-2">
                    Token Expiry(Days)
                  </label>
                  <input
                    type="number"
                    className="w-full bg-auth-bg p-4 py-2 rounded-lg border border-text-light focus:outline-none focus:shadow-outline focus:border-theme-color-primary transition-all duration-300 ease-in-out"
                    placeholder="1"
                    value={methodInput.expireInDays}
                    onChange={(e) =>
                      setMethodInput({
                        ...methodInput,
                        expireInDays: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              {/* Div for Token Name */}
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <div className="w-full">
                  <label className="block text-lg font-semibold mb-2">
                    Token Name
                  </label>
                  <input
                    type="text"
                    className="w-full bg-auth-bg p-4 py-2 rounded-lg border border-text-light focus:outline-none focus:shadow-outline focus:border-theme-color-primary transition-all duration-300 ease-in-out"
                    placeholder="Enter what name you want the token to have"
                    value={methodInput.tokenName}
                    onChange={(e) =>
                      setMethodInput({
                        ...methodInput,
                        tokenName: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Restrictions Input Section */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Add Restrictions</h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-lg font-semibold mb-2">
                  Restriction Type
                </label>
                <select
                  className="w-full bg-auth-bg p-4 py-2 rounded-lg border border-text-light focus:outline-none focus:shadow-outline focus:border-theme-color-primary transition-all duration-300 ease-in-out"
                  value={restrictionInput.type}
                  onChange={(e) =>
                    setRestrictionInput({
                      ...restrictionInput,
                      type: e.target.value,
                    })
                  }
                >
                  {methodInput.method !== "CREATE" && (
                    <option value="SAME_SCHEMA">Same Schema</option>
                  )}
                  <option value="RELEVANT_SCHEMA">Relevant Schema</option>
                </select>
              </div>
              <div>
                <label className="block text-lg font-semibold mb-2">
                  Location
                </label>
                <select
                  className="w-full bg-auth-bg p-4 py-2 rounded-lg border border-text-light focus:outline-none focus:shadow-outline focus:border-theme-color-primary transition-all duration-300 ease-in-out"
                  value={restrictionInput.location}
                  onChange={(e) =>
                    setRestrictionInput({
                      ...restrictionInput,
                      location: e.target.value,
                    })
                  }
                >
                  {locations.map((loc, idx) => (
                    <option key={idx} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {restrictionInput.type === "SAME_SCHEMA" && (
              <div>
                <label className="block text-lg font-semibold mb-2">
                  Field Name
                </label>
                <select
                  className="w-full bg-auth-bg p-4 py-2 rounded-lg border border-text-light focus:outline-none focus:shadow-outline focus:border-theme-color-primary transition-all duration-300 ease-in-out"
                  value={restrictionInput.field_name}
                  onChange={(e) =>
                    setRestrictionInput({
                      ...restrictionInput,
                      field_name: e.target.value,
                    })
                  }
                >
                  {currentSchemaFields.map((field, idx) => (
                    <option key={idx} value={field.name}>
                      {field.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {restrictionInput.type === "RELEVANT_SCHEMA" && (
              <div>
                <label className="block text-lg font-semibold mb-2">
                  Relevant Schema
                </label>
                <select
                  className="w-full bg-auth-bg p-4 py-2 rounded-lg border border-text-light focus:outline-none focus:shadow-outline focus:border-theme-color-primary transition-all duration-300 ease-in-out"
                  value={restrictionInput.related_schema_name}
                  onChange={(e) => {
                    handleRelevantSchemaChange(e.target.value);
                  }}
                >
                  {schemas
                    .filter((schema) => schema._id !== schema_id)
                    .map((schema, idx) => (
                      <option key={idx} value={schema.schema_name}>
                        {schema.schema_name}
                      </option>
                    ))}
                </select>
              </div>
            )}
            {/* If restriction type is RELEVANT_SCHEMA, show related_schema_id inputs*/}
            {restrictionInput.type === "RELEVANT_SCHEMA" && (
              <div className="mt-2">
                <label className="block text-lg font-semibold mb-2">
                  Related Schema ID Location
                </label>
                <select
                  className="w-full bg-auth-bg p-4 py-2 rounded-lg border border-text-light focus:outline-none focus:shadow-outline focus:border-theme-color-primary transition-all duration-300 ease-in-out"
                  value={restrictionInput.related_schema_id.location}
                  onChange={(e) =>
                    setRestrictionInput({
                      ...restrictionInput,
                      related_schema_id: {
                        ...restrictionInput.related_schema_id,
                        location: e.target.value,
                      },
                    })
                  }
                >
                  {locations.map((loc, idx) => (
                    <option key={idx} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {restrictionInput.type === "RELEVANT_SCHEMA" && (
              <div className="mt-2">
                <label className="block text-lg font-semibold mb-2">
                  Related Schema ID Attribute Name
                </label>
                <input
                  type="text"
                  className="w-full bg-auth-bg p-4 py-2 rounded-lg border border-text-light focus:outline-none focus:shadow-outline focus:border-theme-color-primary transition-all duration-300 ease-in-out"
                  placeholder="Related Schema ID"
                  value={restrictionInput.related_schema_id.value}
                  onChange={(e) =>
                    setRestrictionInput({
                      ...restrictionInput,
                      related_schema_id: {
                        ...restrictionInput.related_schema_id,
                        value: e.target.value,
                      },
                    })
                  }
                />
              </div>
            )}
            {restrictionInput.type === "RELEVANT_SCHEMA" && (
              <div className="mt-2">
                <label className="block text-lg font-semibold mb-2">
                  Field Name
                </label>
                <select
                  className="w-full bg-auth-bg p-4 py-2 rounded-lg border border-text-light focus:outline-none focus:shadow-outline focus:border-theme-color-primary transition-all duration-300 ease-in-out"
                  value={restrictionInput.field_name}
                  onChange={(e) =>
                    setRestrictionInput({
                      ...restrictionInput,
                      field_name: e.target.value,
                    })
                  }
                >
                  {relevantSchemaFields.map((field, idx) => (
                    <option key={idx} value={field.name}>
                      {field.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <label className="block text-lg font-semibold mt-2 mb-2">
              Attribute Name
            </label>
            <input
              type="text"
              className="w-full bg-auth-bg p-4 py-2 rounded-lg border border-text-light focus:outline-none focus:shadow-outline focus:border-theme-color-primary transition-all duration-300 ease-in-out"
              placeholder="Attribute Name"
              value={restrictionInput.attribute_name}
              onChange={(e) =>
                setRestrictionInput({
                  ...restrictionInput,
                  attribute_name: e.target.value,
                })
              }
            />
            <div className="flex flex-row flex-wrap gap-3">
              <button
                onClick={handleAddRestriction}
                className="text-theme-color-primary border border-theme-color-primary hover:bg-theme-color-primary transition-all duration-300 ease-in-out hover:text-text-normal py-1 px-6 rounded-md mt-4"
              >
                Add Restriction
              </button>
              <button
                onClick={handleAddMethod}
                className="text-theme-color-primary border border-theme-color-primary hover:bg-theme-color-primary transition-all duration-300 ease-in-out hover:text-text-normal py-1 px-6 rounded-md mt-4"
              >
                Add Method
              </button>
            </div>
          </div>
          {/* Restrictions List */}
          <div>
            {methodInput.restrictions.length > 0 && (
              <ul className="list-disc ml-8 mt-4">
                {methodInput.restrictions.map((res, idx) => (
                  <li key={idx}>
                    <div className="flex flex-col sm:flex-row justify-between">
                      <div>
                        <strong>{res.type}</strong>:{" "}
                        {res.field_name || res.related_schema_name} at{" "}
                        {res.location} (Attribute: {res.attribute_name})
                      </div>
                      <div className="flex flex-row gap-4">
                        <button className="text-green-600 max-sm:self-start" 
                        onClick={()=>handleEditRestriction(idx)}
                        >
                            Edit Restriction
                        </button>
                        <button className="text-delete-color max-sm:self-start" 
                        onClick={()=>handleDeleteRestriction(idx)}
                        >
                            Delete Restriction
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {/* Methods List Section */}
          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Added Methods</h2>
            {methodsList.length > 0 ? (
              <ul className="list-disc ml-8">
                {methodsList.map((method, idx) => (
                  <li key={idx} className="mb-2">
                    <div className="flex flex-col sm:flex-row justify-between">
                    <div>
                    <strong>{method.method}</strong>: {method.route_name}{" "}
                    {method.sendToken &&
                      `(Token: ${method.tokenName}, Expires: ${method.expireInDays} days)`}
                    <ul className="ml-6">
                      {method.restrictions.map((res, resIdx) => (
                        <li key={resIdx}>
                          <strong>{res.type}</strong>:{" "}
                          {res.field_name || res.related_schema_name} at{" "}
                          {res.location} (Attribute: {res.attribute_name})
                        </li>
                      ))}
                    </ul>
                    </div>
                    <div className="flex flex-row gap-4">
                      <button className="text-green-600 max-sm:self-start" 
                      onClick={()=>handleEditMethod(idx)}
                      >
                          Edit Method
                      </button>
                      <button className="text-delete-color max-sm:self-start" 
                      onClick={()=>handleDeleteMethod(idx)}
                      >
                          Delete Method
                      </button>
                    </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No methods added yet.</p>
            )}
          </div>
          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="bg-theme-color-secondary hover:bg-theme-color-primary transition-all duration-300 ease-in-out text-text-normal py-2 px-8 rounded-md mt-6"
          >
            Submit Methods
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

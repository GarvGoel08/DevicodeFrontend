import React, { useState } from "react";
import Navbar from "../components/Navbar2";
import Footer from "../components/Footer";
import { useNavigate, useParams } from "react-router-dom";

export default function CreateSchema() {
  const { project_id } = useParams();
  const [schemaName, setSchemaName] = useState("");
  const [fields, setFields] = useState([]);
  const [fieldInput, setFieldInput] = useState({
    name: "",
    type: "String",
    isRequired: false,
    isUnique: false,
    isHashed: false,
  });
  const [jwtToken, setJwtToken] = useState({ isEnabled: false, tokenName: "" });
  const fieldTypes = ["String", "Number", "Boolean", "Date", "Array", "Object"];
  const router = useNavigate();
  const handleAddField = () => {
    if (!fieldInput.name || !fieldInput.type) {
      alert("Field name and type are required!");
      return;
    }
    setFields([...fields, fieldInput]);
    setFieldInput({
      name: "",
      type: "String",
      isRequired: false,
      isUnique: false,
      isHashed: false,
    });
  };

  const handleSubmit = () => {
    if (!schemaName) {
      alert("Schema name is required!");
      return;
    }
    if (fields.length === 0) {
      alert("At least one field is required!");
      return;
    }
    console.log(jwtToken);
    const schemaData = {
      schema_name: schemaName,
      fields,
      jwtToken,
      project_id,
    };

    fetch(`${process.env.REACT_APP_BACKEND_URL}api/v1/createSchema`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(schemaData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert("Schema created successfully!");
          setSchemaName("");
          setFields([]);
          setJwtToken({ isEnabled: false, tokenName: "" });
          router(`/dashboard/addMethods/${project_id}/${data.schema._id}`);

        } else {
          alert(data.message || "Failed to create schema");
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="h-screen bg-auth-bg flex flex-col">
      <Navbar />
      <div className="flex-grow p-8 px-2 sm:px-8 bg-auth-bg">
        <div className="bg-main-bg rounded-lg p-8 text-text-light shadow-lg max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Create New Schema</h1>
          {/* Schema Name Input */}
          <div className="mb-6">
            <label className="block text-lg font-semibold mb-2">
              Schema Name
            </label>
            <input
              type="text"
              className="w-full bg-auth-bg p-4 py-2 rounded-lg border border-text-light focus:outline-none focus:shadow-outline focus:border-theme-color-primary transition-all duration-300 ease-in-out"
              placeholder="Enter schema name"
              value={schemaName}
              onChange={(e) => setSchemaName(e.target.value)}
            />
          </div>
          {/* Fields Section */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Fields</h2>
            <div className="mb-6">
              {/* Field Input */}
              <div className="flex sm:flex-row flex-col flex-wrap gap-4 mb-4">
                <div className="flex-1">
                  <label className="block text-lg font-semibold mb-2">
                    Field Name
                  </label>
                  <input
                    type="text"
                    className="w-full bg-auth-bg p-4 py-2 rounded-lg border border-text-light focus:outline-none focus:shadow-outline focus:border-theme-color-primary transition-all duration-300 ease-in-out"
                    placeholder="Enter field name"
                    value={fieldInput.name}
                    onChange={(e) =>
                      setFieldInput({ ...fieldInput, name: e.target.value })
                    }
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-lg font-semibold mb-2">
                    Field Type
                  </label>
                  <select
                    className="w-full bg-auth-bg p-4 py-2 rounded-lg border border-text-light focus:outline-none focus:shadow-outline focus:border-theme-color-primary transition-all duration-300 ease-in-out"
                    value={fieldInput.type}
                    onChange={(e) =>
                      setFieldInput({ ...fieldInput, type: e.target.value })
                    }
                  >
                    {fieldTypes.map((type, idx) => (
                      <option key={idx} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {/* Field Options */}
              <div className="flex flex-wrap gap-4 items-center mb-4">
                <label>
                  <input
                    type="checkbox"
                    checked={fieldInput.isRequired}
                    onChange={(e) =>
                      setFieldInput({
                        ...fieldInput,
                        isRequired: e.target.checked,
                      })
                    }
                  />{" "}
                  Required
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={fieldInput.isUnique}
                    onChange={(e) =>
                      setFieldInput({
                        ...fieldInput,
                        isUnique: e.target.checked,
                      })
                    }
                  />{" "}
                  Unique
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={fieldInput.isHashed}
                    onChange={(e) =>
                      setFieldInput({
                        ...fieldInput,
                        isHashed: e.target.checked,
                      })
                    }
                  />{" "}
                  Hashed
                </label>
              </div>
              <button
                onClick={handleAddField}
                className="text-theme-color-primary border border-theme-color-primary hover:bg-theme-color-primary transition-all duration-300 ease-in-out hover:text-text-normal py-1 px-6 rounded-md"
              >
                Add Field
              </button>
            </div>
            {/* Fields List */}
            <div className="mt-4">
              {fields.length > 0 && (
                <ul className="list-disc ml-8">
                  {fields.map((field, idx) => (
                    <li key={idx} className="flex justify-between items-center">
                      <span>
                        <strong>{field.name}</strong> ({field.type})
                        {field.isRequired && ", Required"}
                        {field.isUnique && ", Unique"}
                        {field.isHashed && ", Hashed"}
                      </span>
                      <button
                        onClick={() => {
                          setFields(fields.filter((_, i) => i !== idx));
                        }}
                        className="text-red-500 hover:underline ml-4"
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="mt-4 flex flex-row items-center gap-2">
              <label className="block text-lg font-semibold ">
                JWT Enabled:
              </label>
              <input
                type="checkbox"
                checked={jwtToken.isEnabled}
                onChange={(e) =>
                  setJwtToken({ ...jwtToken, isEnabled: e.target.checked })
                }
              />
            </div>

            {/* JWT Token */}
            <div className="mt-4">
              <label className="block text-lg font-semibold mb-2">
                JWT Token
              </label>
              <input
                type="text"
                className="w-full bg-auth-bg p-4 py-2 rounded-lg border border-text-light focus:outline-none focus:shadow-outline focus:border-theme-color-primary transition-all duration-300 ease-in-out"
                placeholder="Enter JWT Token"
                value={jwtToken.tokenName}
                onChange={(e) =>
                  setJwtToken({ ...jwtToken, tokenName: e.target.value })
                }
              />
            </div>
          </div>
          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="bg-theme-color-secondary hover:bg-theme-color-primary transition-all duration-300 ease-in-out text-text-normal py-2 px-8 rounded-md mt-6"
          >
            Submit Schema
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

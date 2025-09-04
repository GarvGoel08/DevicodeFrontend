import React,{useState} from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar2';
import Footer from '../components/Footer';
import Spinner from '../components/Spinner';
import SchemaForm from '../components/SchemaForm';

function SchemaGeneratePage() {
    const {project_id} = useParams();
    const [sch,setSch] = useState({
        "schemaName": "",
        "fields":[],
        "jwtToken": {
                "isEnabled": false,
                "tokenName": ""
        },
        "methodsList": [
                {
                    "method": "CREATE",
                    "route_name": "/create",
                    "restrictions": [],
                    "sendToken": false,
                    "tokenName": "",
                    "expireInDays": 1
                }
        ]
    });
    const [showForm,setShowForm] = useState(false);
    const [selectedModel,setSelectedModel] = useState("llama3.2");
    const [schemaName,setSchemaName] = useState("");
    const [details,setDetails] = useState("")
    const [loading,setLoading] = useState(false);
    const handleGenerateSchema = () =>{
        if(!schemaName){
          alert("Schema Name is required field");
          return;
        }

        setLoading(true);
        const userInput = {
            modelType: selectedModel,
            schemaName,
            details
        };

        fetch(`${process.env.REACT_APP_BACKEND_URL}api/v1/generate-schema`, {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(userInput),
          })
          .then(res=>res.json())
          .then(dat=>{
            console.log(dat);
            const Schema = dat.data;
            setShowForm(true);
            setSch(Schema);
            setLoading(false)
          })
          .catch(err=>{
            console.log(err)
            setLoading(false)
          })
          
    }
    
  return (
    <div className="h-screen bg-auth-bg flex flex-col">
      <Navbar/>
      <div className="flex-grow p-8 px-2 sm:px-8 bg-auth-bg">
        <div className="bg-main-bg rounded-lg p-8 text-text-light shadow-lg max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Generate Schema</h1>
          {/* Schema Name Input */}
          <div className="mb-6">
            {/* Choose Model Dropdown */}
            <label className="block text-lg font-semibold mb-2">
              Choose Model
            </label>
            <select
              className="w-full bg-auth-bg p-4 py-2 rounded-lg border border-text-light focus:outline-none focus:shadow-outline focus:border-theme-color-primary transition-all duration-300 ease-in-out"
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
            >
              <option value="llama3.2">
                Llama 3.2B - Quick results, standard precision
              </option>
              <option value="llama3.3">
                Llama 3.3B - High accuracy, optimized for complexity
              </option>
            </select>

            {/* Schema Name Input */}
            <label className="block text-lg font-semibold mb-2 mt-4">
              Schema Name
            </label>
            <input
              type="text"
              className="w-full bg-auth-bg p-4 py-2 rounded-lg border border-text-light focus:outline-none focus:shadow-outline focus:border-theme-color-primary transition-all duration-300 ease-in-out"
              placeholder="Enter schema name"
              value={schemaName}
              onChange={(e) => setSchemaName(e.target.value)}
            />

            {/* Schema Details Input */}
            <label className="block text-lg font-semibold mb-2 mt-4">
              Details
            </label>
            <input
              type="text"
              className="w-full bg-auth-bg p-4 py-2 rounded-lg border border-text-light focus:outline-none focus:shadow-outline focus:border-theme-color-primary transition-all duration-300 ease-in-out"
              placeholder="Enter details about your schema"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
          </div>

          <button 
          onClick={()=>handleGenerateSchema()}
          className='bg-theme-color-secondary hover:bg-theme-color-primary transition-all duration-300 ease-in-out text-text-normal py-2 px-8 rounded-md'>
            Generate Schema  
          </button> 
          {loading && <Spinner/>}
        </div>
        {showForm && (
          <div className='py-10'> 
            <SchemaForm Schema={sch} project_id={project_id}/>
          </div>
        )}
      </div>

      <Footer/>
    </div>
  )
}

export default SchemaGeneratePage

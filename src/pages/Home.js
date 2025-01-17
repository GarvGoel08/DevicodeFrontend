import React from "react";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import HowItWorks from "../components/HowItWorks";
import Features from "../components/Features";
import Footer from "../components/Footer";

export default function Home() {
  const features = [
    {
      title: "No-Code Backend Creation",
      description:
        "Build and deploy your backend effortlessly without writing a single line of code.",
      icon: "CodeBlock",
    },
    {
      title: "Customizable Schemas",
      description:
        "Easily define data structures and relationships tailored to your application's needs.",
      icon: "Database",
    },
    {
      title: "API Route Generation",
      description:
        "Generate fully functional API endpoints instantly, ready to integrate with your frontend.",
      icon: "Cloud",
    },
    {
      title: "Secure Data Handling",
      description:
        "Built-in encryption and secure storage to ensure your data remains private and protected.",
      icon: "ShieldCheck",
    },
    {
      title: "API Documentation",
      description:
        "Automatically generated, developer-friendly API documentation for seamless integration.",
      icon: "DocumentText",
    },
  ];

  const steps = [
    {
      title: "Step 1: Login or Signup",
      description:
        "Create an account or log in to start using Devicode. This will give you access to the features of the platform.",
    },
    {
      title: "Step 2: Create a Project",
      description:
        "Start by creating a new project to group your backend schemas and configurations.",
    },
    {
      title: "Step 3: Create a Schema",
      description:
        "Define your data structure by creating a schema with fields, types, and additional configurations.",
    },
    {
      title: "Step 4: Define Routes",
      description:
        "Specify the API routes for your schema, including Create, Read, Update, and Delete options.",
    },
    {
      title: "Step 5: Get API Documentation",
      description:
        "Click on 'API Documentation' to generate detailed API docs and integrate them into your frontend.",
    },
  ];
  return (
    <div className="bg-main-bg">
      <div className="bg-blue-grad">
        <Navbar />
        <Hero />
      </div>
      <HowItWorks steps={steps} />
      <Features features={features} />
      <Footer/>
    </div>
  );
}

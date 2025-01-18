import React from "react";
import RevealFeature from "./RevealFeature";


export default function Features({features}) {
  

  return (
    <div id="features" className="flex bg-secondary-bg flex-col text-text-normal gap-10 px-8 py-16">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-primary tracking-tight text-4xl font-bold text-center max-w-[720px]">
          Features
        </h1>
        <p className="text-secondary text-lg font-medium leading-relaxed text-center max-w-[720px]">
          Discover how our platform enhances your experience with powerful and
          user-friendly tools.
        </p>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6">
        {features.map((feature, index) => (
          <RevealFeature feature={feature} key={index}/>
          
        ))}
      </div>
    </div>
  );
}

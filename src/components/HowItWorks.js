import React from "react";
import RevealSteps from "./RevealSteps";

export default function HowItWorks({steps}) {
  return (
    <div id="learn-more">
      <div className="flex flex-col py-12">
        <h1 className="text-4xl mb-8 font-bold text-text-normal text-center">
          How it works
        </h1>
        <div className="flex flex-col">
          {steps.map((step, index) => (
            <RevealSteps step={step} index={index} key={index}/>
            // <div className="flex flex-row" key={index}>
            //   <div
            //     className="py-6 px-6 w-[50%] items-center justify-center max-lg:hidden sm:block hidden"
            //   >
            //     <div
            //       className={`flex flex-col w-full h-full gap-1 bg-white bg-opacity-5 rounded-xl p-4 py-6 ${
            //         index % 2 === 0 ? "" : "hidden"
            //       }`}
            //     >
            //       <h2 className="text-lg font-semibold text-text-normal">
            //         {step.title}
            //       </h2>
            //       <p className="text-base text-text-light">
            //         {step.description}
            //       </p>
            //     </div>
            //   </div>

            //   <div
            //     className="relative border-l sm:ml-0 ml-4 border-theme-color-primary py-6 px-6 sm:w-[50%] w-full items-center justify-center"
            //   >
            //     <div
            //       className={`flex flex-col w-full h-full gap-1 bg-white bg-opacity-5 rounded-xl p-4 py-6 ${
            //         index % 2 === 0 ? "sm:hidden block" : ""
            //       } `}
            //     >
            //       <h2 className="text-lg font-semibold text-text-normal">
            //         {step.title}
            //       </h2>
            //       <p className="text-base text-text-light">
            //         {step.description}
            //       </p>
            //     </div>
            //     <div className="absolute -left-[6px] top-[56px] transform -translate-y-1/2 w-3 h-3 bg-theme-color-primary rounded-full"></div>
            //   </div>
            // </div>
          ))}
        </div>
      </div>
    </div>
  );
}

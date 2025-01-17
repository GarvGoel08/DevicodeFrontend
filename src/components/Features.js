import React from "react";

export default function Features({features}) {
  return (
    <div className="flex bg-secondary-bg flex-col text-text-normal gap-10 px-8 py-16">
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
          <div
            key={index}
            className="flex text-center items-center justify-center flex-1 gap-4 bg-card-bg shadow-card-shadow backdrop-blur-lg border border-text-light rounded-lg duration-150 bg-black bg-opacity-[0.15] cursor-default hover:border-theme-color-secondary p-6 py-8 flex-col"
          >
            <div className="text-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50px"
                height="50px"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M208,24H72A32,32,0,0,0,40,56V224a8,8,0,0,0,8,8H192a8,8,0,0,0,0-16H56a16,16,0,0,1,16-16H208a8,8,0,0,0,8-8V32A8,8,0,0,0,208,24Zm-8,160H72a31.82,31.82,0,0,0-16,4.29V56A16,16,0,0,1,72,40H200Z"></path>
              </svg>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-primary text-xl font-semibold leading-snug">
                {feature.title}
              </h2>
              <p className="text-secondary-light text-text-light text-base font-normal leading-relaxed">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

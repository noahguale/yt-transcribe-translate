import React, { FC, useEffect, useRef } from "react";
import Container from "./Container";

interface ResultsProps {
  children: string | undefined;
}

const Results: FC<ResultsProps> = ({ children }) => {
  const refContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentContainer = refContainer.current;
    if (currentContainer) {
      currentContainer.scrollTop = currentContainer.scrollHeight;
    }
  }, [children]);
  return (
    <>
      <div ref={refContainer} className="flex-1 overflow-auto">
        <pre className="text-white text-12 whitespace-pre-wrap p-3	">
          {children}
        </pre>
      </div>
    </>
  );
};

export default Results;

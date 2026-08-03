"use client";

import Button from "@/component/shared/Button";

const page = () => {
  return (
    <div className="container">
      <div className="!bg-primary flex justify-center">
        {" "}
        <Button href="/">Go home</Button>
        <Button variant="outline" onClick={() => alert("clicked")}>
          Click me
        </Button>
      </div>
    </div>
  );
};

export default page;

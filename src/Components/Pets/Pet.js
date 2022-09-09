import React from "react";
import { useSearchParams } from "react-router-dom";

const Cats = ({ pet }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div>
      <img
        src={`${pet.url}`}
        srcSet={`${pet.url}`}
        alt={""}
        loading="lazy"
        style={{
          borderRadius: "20px",
          display: "block",
          width: "100%",
          cursor: "pointer",
        }}
        onClick={() => {
          searchParams.set("image_id", pet.id);

          setSearchParams(searchParams);
        }}
      />
    </div>
  );
};

export default Cats;

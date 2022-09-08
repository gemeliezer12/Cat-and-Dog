import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCatDogContext } from "../Contexts/CatDogContext";
import Masonry from "@mui/lab/Masonry";
import { Box } from "@mui/system";

const CatDog = () => {
  const { catsDogs, getManyCatDogByBreed } = useCatDogContext();
  const { breeds_id } = useParams();

  useEffect(() => {
    getManyCatDogByBreed(breeds_id);
  }, [breeds_id]);

  if (!catsDogs) return "";

  return (
    <div style={{
      display: "flex",
      flexDirection: "column"
    }}>
      <div style={{
        display: "flex",
        }}>
        <p style={{
          color: "var(--base-color-pink)",
          fontSize: "40px",
        }}>Cats</p>
      </div>
      <Masonry
        columns={{ xs: 2, sm: 3, md: 4, lg: 5, xl: 6 }}
        spacing={1}
      >
        {catsDogs.map((catDog, index) => (
          <div key={index}>
            <img
              src={`${catDog.url}`}
              srcSet={`${catDog.url}`}
              alt={""}
              loading="lazy"
              style={{
                borderRadius: "20px",
                display: "block",
                width: "100%",
              }}
            />
          </div>
        ))}
      </Masonry>
    </div>
  );
};

export default CatDog;

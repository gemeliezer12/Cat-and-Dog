import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCatDogContext } from "../Contexts/CatDogContext";

const CatDog = () => {
  const { catsDogs, getManyCatDogByBreed } = useCatDogContext()
  const { breeds_id } = useParams()

  useEffect(() => {
    getManyCatDogByBreed(breeds_id)
  }, [breeds_id])

  if (!catsDogs) return ""

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, 300px)",
        justifyContent: "center",
        gap: "20px",
      }}
    >
      {catsDogs.map((catDog) => <>
        <img src={catDog.url}></img>
      </>)}
    </div>
  );
};

export default CatDog;

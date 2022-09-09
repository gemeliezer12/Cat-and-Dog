import React from "react";
import { Link } from "react-router-dom";
import { usePetContext } from "../Contexts/PetContext";
import Breed from "../Components/Breeds/Breed";

const Breeds = () => {
  const { petBreeds, petBreedsPageNumber, changePetBreeds, petBreedsMaxPage } =
    usePetContext();

  if (!petBreeds) return "";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "32px",
      }}
    >
      <div
        style={{
          display: "flex",
        }}
      >
        <Link
          to={"/"}
          style={{
            cursor: "pointer",
            color: "var(--base-color-pink)",
            fontSize: "40px",
            fontWeight: "700",
          }}
        >
          Breeds
        </Link>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))",
          justifyContent: "center",
          gap: "15px",
          marginTop: "20px",
        }}
      >
        {petBreeds.map((breed) => (
          <>
            <Breed breed={breed} key={breed.id} />
          </>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "10px",
          }}
        >
          <div
            onClick={() => {
              if (petBreedsPageNumber - 1 < 0) return;
              changePetBreeds(petBreedsPageNumber - 1);
            }}
            className="dark"
            style={{
              padding: "10px 25px",
              backgroundColor: "var(--base-color-pink)",
              borderRadius: "4px",
              fontWeight: "900",
              cursor: "pointer",
              opacity: petBreedsPageNumber - 1 < 0 ? ".4" : "1",
              cursor: petBreedsPageNumber - 1 < 0 ? "not-allowed" : "pointer",
            }}
          >
            <p>Previous</p>
          </div>
          <div
            onClick={() => {
              if (petBreedsPageNumber + 1 > petBreedsMaxPage) return;
              changePetBreeds(petBreedsPageNumber + 1);
            }}
            className="dark"
            style={{
              padding: "10px 25px",
              backgroundColor: "var(--base-color-pink)",
              borderRadius: "4px",
              fontWeight: "900",
              opacity: petBreedsPageNumber + 1 > petBreedsMaxPage ? ".4" : "1",
              cursor:
                petBreedsPageNumber + 1 > petBreedsMaxPage
                  ? "not-allowed"
                  : "pointer",
            }}
          >
            <p>Next</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Breeds;

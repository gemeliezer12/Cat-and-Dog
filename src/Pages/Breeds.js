import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useCatDogContext } from "../Contexts/CatDogContext";

const Breeds = () => {
  const {
    catDogBreeds,
    catDogBreedsPageNumber,
    changeCatDogBreeds,
    catDogBreedsMaxPage,
  } = useCatDogContext();
  const [searchParams, setSearchParams] = useSearchParams();

  if (!catDogBreeds) return "";

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
        {catDogBreeds.map((breed) => (
          <div
            key={breed.id}
            className="dark"
            style={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "var(--base-color-indigo)",
              borderRadius: "20px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: "100%",
                paddingTop: "75%",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  overFlow: "hidden",
                  top: "0",
                  left: "0",
                }}
              >
                <img
                  src={breed.image && breed.image.url}
                  alt={`${breed.name}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "50% 0%",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    searchParams.set("image_id", breed.image.id);

                    setSearchParams(searchParams);
                  }}
                />
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "20px",
                paddingTop: "10px",
                justifyContent: "space-between",
                height: "100%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <p
                  style={{
                    fontSize: "26px",
                    fontWeight: "700",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {breed.name}
                </p>
                <p
                  style={{
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitLineClamp: "2",
                    lineClamp: "2",
                    WebkitBoxOrient: "vertical",
                    marginTop: "6px",
                  }}
                >
                  {breed.description ? breed.description : breed.temperament}
                </p>
              </div>
            </div>
          </div>
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
              if (catDogBreedsPageNumber - 1 < 0) return;
              changeCatDogBreeds(catDogBreedsPageNumber - 1);
            }}
            className="dark"
            style={{
              padding: "10px 25px",
              backgroundColor: "var(--base-color-pink)",
              borderRadius: "4px",
              fontWeight: "900",
              cursor: "pointer",
              opacity: catDogBreedsPageNumber - 1 < 0 ? ".4" : "1",
              cursor:
                catDogBreedsPageNumber - 1 < 0 ? "not-allowed" : "pointer",
            }}
          >
            <p>Previous</p>
          </div>
          <div
            onClick={() => {
              if (catDogBreedsPageNumber + 1 > catDogBreedsMaxPage) return;
              changeCatDogBreeds(catDogBreedsPageNumber + 1);
            }}
            className="dark"
            style={{
              padding: "10px 25px",
              backgroundColor: "var(--base-color-pink)",
              borderRadius: "4px",
              fontWeight: "900",
              opacity:
                catDogBreedsPageNumber + 1 > catDogBreedsMaxPage ? ".4" : "1",
              cursor:
                catDogBreedsPageNumber + 1 > catDogBreedsMaxPage
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

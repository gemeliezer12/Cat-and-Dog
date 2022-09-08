import React from "react";
import { useCatDogContext } from "../Contexts/CatDogContext";

const Breeds = () => {
  const { catDogBreeds, catDogBreedsPageNumber, changeCatDogBreeds } = useCatDogContext()

  if (!catDogBreeds) return ""
  

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      padding: "32px"
    }}>
      <div style={{
        display: "flex",
        }}>
        <p style={{
          color: "var(--base-color-pink)",
          fontSize: "40px",
        }}>Breeds</p>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))",
          justifyContent: "center",
          gap: "15px",
          marginTop: "20px"
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
                position: "relative"
              }}
            >
              <div style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                overFlow: "hidden",
                top: "0",
                left: "0"
              }}>
                <img
                  src={breed.image && breed.image.url}
                  alt={`image of an ${breed.name}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "50% 0%",
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
                height: "100%"
              }}
            >
              <div style={{
                display: "flex",
                flexDirection: "column"
              }}>
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
                    marginTop: "6px"
                  }}
                >
                  {breed.description ? breed.description : breed.temperament}
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  marginTop: "10px"
                }}
              >
                <div
                  style={{
                    display: "flex",
                    backgroundColor: "var(--bg-color-1)",
                    padding: "10px 25px",
                    borderRadius: "4px",
                    fontWeight: "900",
                    cursor: "pointer",
                  }}
                >
                  READ MORE
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: "20px"
      }}>
        <div style={{
          display: "flex",
          gap: "10px"
        }}>
          <div onClick={() => changeCatDogBreeds(catDogBreedsPageNumber - 1)} className="dark" style={{
            padding: "10px 25px",
            backgroundColor: "var(--base-color-pink)",
            borderRadius: "4px",
            fontWeight: "900",
            cursor: "pointer"
          }}>
            <p>Previous</p>
          </div>
          <div onClick={() => changeCatDogBreeds(catDogBreedsPageNumber + 1)} className="dark" style={{
            padding: "10px 25px",
            backgroundColor: "var(--base-color-pink)",
            borderRadius: "4px",
            fontWeight: "900",
            cursor: "pointer"
          }}>
            <p>Next</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Breeds;

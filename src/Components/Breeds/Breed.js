import React from "react";
import { useSearchParams } from "react-router-dom";

const Breeds = ({ breed }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <>
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
    </>
  );
};

export default Breeds;

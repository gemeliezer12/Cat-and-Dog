import React from "react";
import { useSearchParams } from "react-router-dom";
import styles from "./Breed.module.css";

const Breeds = ({ breed }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <>
      <div key={breed.id} className={`dark ${styles.card}`}>
        <div className={styles.imageContainer}>
          <img
            className={styles.image}
            src={breed.image && breed.image.url}
            alt={`${breed.name}`}
            onClick={() => {
              searchParams.set("image_id", breed.image.id);

              setSearchParams(searchParams);
            }}
          />
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
            <p className={styles.name}>{breed.name}</p>
            <p className={styles.description}>
              {breed.description ? breed.description : breed.temperament}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Breeds;

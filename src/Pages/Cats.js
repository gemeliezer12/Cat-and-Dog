import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useCatDogContext } from "../Contexts/CatDogContext";
import Masonry from "@mui/lab/Masonry";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";

const Cats = () => {
  const {
    catImagesByBreed,
    setCatImagesByBreedPageNumber,
    setCatImagesByBreedTrigger,
    setSelectedCatBreed,
    catImagesByBreedMaxPage,
    catImagesByBreedPageNumber,
    selectedCatBreed,
  } = useCatDogContext();
  const [breedOptions, setBreedOptions] = useState();
  const [searchParams, setSearchParams] = useSearchParams();

  const breedOptionsHandler = async () => {
    try {
      setBreedOptions(
        (await axios.get(`https://api.thecatapi.com/v1/breeds`)).data
      );
    } catch (error) {}
  };

  useEffect(() => {
    breedOptionsHandler();
  }, []);

  useEffect(() => {
    setSelectedCatBreed(searchParams.get("breeds_id"));
  }, [searchParams.get("breeds_id")]);

  if (!catImagesByBreed) return "";
  if (!breedOptions) return "";

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
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
          }}
        >
          <Link
            to={"/cats"}
            style={{
              cursor: "pointer",
              color: "var(--base-color-pink)",
              fontSize: "40px",
              fontWeight: "700",
            }}
          >
            Cats
          </Link>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "start",
            gap: "10px",
          }}
        >
          <FormControl fullWidth sx={{ minWidth: "240px" }}>
            <InputLabel id="demo-simple-select-label">Breed</InputLabel>
            <Select
              value={
                selectedCatBreed &&
                breedOptions.filter(
                  (breedOption) => breedOption.id == selectedCatBreed
                )[0].id
              }
              label="Breed"
              onChange={(e) => {
                const { value } = e.target;

                searchParams.set("breeds_id", value);

                setSearchParams(searchParams);
              }}
            >
              {breedOptions.map((breedOption) => (
                <MenuItem key={breedOption.id} value={breedOption.id}>
                  {breedOption.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
      <div
        style={{
          marginTop: "20px",
        }}
      >
        <Masonry columns={{ xs: 2, sm: 3, md: 4, lg: 5, xl: 6 }} spacing={1}>
          {catImagesByBreed.map((cat, index) => (
            <div key={index}>
              <img
                src={`${cat.url}`}
                srcSet={`${cat.url}`}
                alt={""}
                loading="lazy"
                style={{
                  borderRadius: "20px",
                  display: "block",
                  width: "100%",
                  cursor: "pointer",
                }}
                onClick={() => {
                  searchParams.set("image_id", cat.id);

                  setSearchParams(searchParams);
                }}
              />
            </div>
          ))}
        </Masonry>
      </div>
      {catImagesByBreedPageNumber + 1 > catImagesByBreedMaxPage ? (
        ""
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
          }}
        >
          <div
            className="dark"
            style={{
              padding: "10px 25px",
              backgroundColor: "var(--base-color-pink)",
              borderRadius: "4px",
              fontWeight: "900",
              cursor: "pointer",
            }}
            onClick={() => {
              setCatImagesByBreedPageNumber((prevState) => prevState + 1);
              setCatImagesByBreedTrigger((prevState) => !prevState);
            }}
          >
            <p>Load more</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cats;

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCatDogContext } from "../Contexts/CatDogContext";
import Masonry from "@mui/lab/Masonry";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";

const Cats = () => {
  const { catImages, getCatImagesByBreed } = useCatDogContext();
  const { breeds_id } = useParams();
  const [breedOptions, setBreedOptions] = useState();
  const navigate = useNavigate()

  const breedOptionsHandler = async () => {
    try {
      setBreedOptions(
        (await axios.get(`https://api.thecatapi.com/v1/breeds`)).data
      );
    } catch (error) {}
  };

  useEffect(() => {
    if (!breeds_id) return ""
    breedOptionsHandler();
    getCatImagesByBreed(breeds_id);
  }, [breeds_id]);

  if (!catImages) return "";
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
        <div>
          <p
            style={{
              color: "var(--base-color-pink)",
              fontSize: "40px",
            }}
          >
            Cats
          </p>
        </div>
        <div
          style={{
            display: "flex",
          }}
        >
          <FormControl fullWidth sx={{ minWidth: "240px" }}>
            <InputLabel id="demo-simple-select-label">Breed</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={"age"}
              label="Breed"
              onChange={(e) => {
                navigate(`../cats/${e.target.value}`, { replace: true });
              }}
            >
              {breedOptions.map((breedOption) => (
                <MenuItem key={breedOption.id} value={breedOption.id}>
                  {breedOption.name}
                </MenuItem>
              ))}
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
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
          {catImages.map((cat, index) => (
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
                }}
              />
            </div>
          ))}
        </Masonry>
      </div>
    </div>
  );
};

export default Cats;
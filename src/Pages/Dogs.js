import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCatDogContext } from "../Contexts/CatDogContext";
import Masonry from "@mui/lab/Masonry";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";

const Dogs = () => {
  const {
    dogImagesByBreed,
    setDogImagesByBreedPageNumber,
    setDogImagesByBreedTrigger,
    setSelectedDogBreed,
  } = useCatDogContext();
  const { breeds_id } = useParams();
  const [breedOptions, setBreedOptions] = useState();
  const navigate = useNavigate();

  const breedOptionsHandler = async () => {
    try {
      setBreedOptions(
        (await axios.get(`https://api.thedogapi.com/v1/breeds`)).data
      );
    } catch (error) {}
  };

  useEffect(() => {
    breedOptionsHandler();
  }, []);

  useEffect(() => {
    setSelectedDogBreed(breeds_id);
  }, [breeds_id]);

  if (!dogImagesByBreed) return "";
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
          <p
            style={{
              color: "var(--base-color-pink)",
              fontSize: "40px",
            }}
          >
            Dogs
          </p>
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
                breeds_id &&
                breedOptions.filter(
                  (breedOption) => breedOption.id == breeds_id
                )[0].id
              }
              label="Breed"
              onChange={(e) => {
                const { value } = e.target;

                navigate(`../dogs/${value}`, { replace: true });
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
          {dogImagesByBreed.map((dog, index) => (
            <div key={index}>
              <img
                src={`${dog.url}`}
                srcSet={`${dog.url}`}
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
            setDogImagesByBreedPageNumber((prevState) => prevState + 1);
            setDogImagesByBreedTrigger((prevState) => !prevState);
          }}
        >
          
          <p>Load more</p>
        </div>
      </div>
    </div>
  );
};

export default Dogs;

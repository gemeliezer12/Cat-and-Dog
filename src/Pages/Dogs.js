import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { usePetContext } from "../Contexts/PetContext";
import Masonry from "@mui/lab/Masonry";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Pet from "../Components/Pets/Pet";
import axios from "axios";

const Dogs = () => {
  const {
    dogImagesByBreed,
    setDogImagesByBreedPageNumber,
    setDogImagesByBreedTrigger,
    setSelectedDogBreed,
    dogImagesByBreedMaxPage,
    dogImagesByBreedPageNumber,
    selectedDogBreed,
  } = usePetContext();
  const [breedOptions, setBreedOptions] = useState();
  const [searchParams, setSearchParams] = useSearchParams();

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
    setSelectedDogBreed(searchParams.get("breeds_id"));
  }, [searchParams.get("breeds_id")]);

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
          <Link
            to={"/dogs"}
            style={{
              cursor: "pointer",
              color: "var(--base-color-pink)",
              fontSize: "40px",
              fontWeight: "700",
            }}
          >
            Dogs
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
                selectedDogBreed &&
                breedOptions.filter(
                  (breedOption) => breedOption.id == selectedDogBreed
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
          {dogImagesByBreed.map((pet, index) => (
            <Pet pet={pet} key={pet.id} />
          ))}
        </Masonry>
      </div>
      {dogImagesByBreedPageNumber + 1 > dogImagesByBreedMaxPage ? (
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
              setDogImagesByBreedPageNumber((prevState) => prevState + 1);
              setDogImagesByBreedTrigger((prevState) => !prevState);
            }}
          >
            <p>Load more</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dogs;

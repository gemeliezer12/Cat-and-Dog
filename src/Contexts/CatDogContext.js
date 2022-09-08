import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CatDogContext = React.createContext();

export const useCatDogContext = () => useContext(CatDogContext);

export const CatDogProvider = ({ children }) => {
  const [catDogBreeds, setCatDogBreeds] = useState();
  const [catDogBreedsPerPage, setCatDogBreedsPerPage] = useState(12);
  const [catDogBreedsPageNumber, setCatDogBreedsPageNumber] = useState(0);
  const [catDogBreedsTrigger, setCatDogBreedsTrigger] = useState(false);
  const [catsDogs, setCatsDogs] = useState();
  const [catsDogsPerPage, setCatsDogsPerPage] = useState();
  const [catsDogsPageNumber, setCatsDogsPageNumber] = useState();

  const getCatDogBreeds = async () => {
    const res = await Promise.all([
      axios.get(
        `https://api.thecatapi.com/v1/breeds?page=${catDogBreedsPageNumber}&limit=${
          catDogBreedsPerPage / 2
        }`
      ),
      axios.get(
        `https://api.thedogapi.com/v1/breeds?page=${catDogBreedsPageNumber}&limit=${
          catDogBreedsPerPage / 2
        }`
      ),
    ]);

    const combinedRes = res.reduce(
      (result, item) => {
        return {
          rows: result.rows.concat(item.data),
          count:
            parseInt(item.headers["pagination-count"]) + parseInt(result.count),
        };
      },
      {
        rows: [],
        count: 0,
      }
    );

    setCatDogBreeds(combinedRes.rows)
  };

  const getManyCatDogByBreed = async (breeds_id) => {
    try {
      const res = await Promise.all([
        axios.get(
          `https://api.thecatapi.com/v1/images/search?breed_ids=${breeds_id}&limit=10&page=0`
        ),
        axios.get(
          `https://api.thedogapi.com/v1/images/search?breed_ids=${breeds_id}&limit=10&page=0`
        ),
      ]);

      setCatsDogs(
        res.reduce((result, item) => {
          return result.concat(item.data);
        }, [])
      );
    } catch (error) {}
  };

  const getOneCatDogImage = async () => {
    // console.log(
    //   await axios.get(
    //     `https://api.thedogapi.com/v1/images/pk1AAdloG`
    //   )
    // );
  };

  const changeCatDogBreeds = (newPageNumber) => {
    setCatDogBreedsPageNumber(newPageNumber)
    setCatDogBreedsTrigger((prevState) => !prevState)
  }

  useEffect(() => {
    getCatDogBreeds();
  }, [catDogBreedsTrigger]);

  const value = {
    catDogBreeds,
    catsDogs,
    getManyCatDogByBreed,
    catDogBreedsPageNumber,
    changeCatDogBreeds
  };

  return (
    <CatDogContext.Provider value={value}>{children}</CatDogContext.Provider>
  );
};

import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const CatDogContext = React.createContext();

export const useCatDogContext = () => useContext(CatDogContext);

export const CatDogProvider = ({ children }) => {
  const [catDogBreeds, setCatDogBreeds] = useState();
  const [catDogBreedsPageNumber, setCatDogBreedsPageNumber] = useState(0);
  const [catDogBreedsTrigger, setCatDogBreedsTrigger] = useState(false);
  const [catDogBreedsMaxPage, setCatDogBreedsMaxPage] = useState(0);
  const [catImagesByBreed, setCatImagesByBreed] = useState([]);
  const [dogImagesByBreed, setDogImagesByBreed] = useState([]);
  const [catImagesByBreedPageNumber, setCatImagesByBreedPageNumber] =
    useState(0);
  const [dogImagesByBreedPageNumber, setDogImagesByBreedPageNumber] =
    useState(0);
  const [catImagesByBreedTrigger, setCatImagesByBreedTrigger] = useState(false);
  const [dogImagesByBreedTrigger, setDogImagesByBreedTrigger] = useState(false);
  const [selectedCatBreed, setSelectedCatBreed] = useState();
  const [selectedDogBreed, setSelectedDogBreed] = useState();
  const [catImagesByBreedMaxPage, setCatImagesByBreedMaxPage] = useState();
  const [datImagesByBreedMaxPage, setDogImagesByBreedMaxPage] = useState();
  const [catDogImageToView, setCatDogImageToView] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const catDogImageToViewID = searchParams.get("image_id")

  const getCatDogBreeds = async () => {
    const res = await Promise.all([
      axios.get(
        `https://api.thecatapi.com/v1/breeds?page=${catDogBreedsPageNumber}&limit=6`
      ),
      axios.get(
        `https://api.thedogapi.com/v1/breeds?page=${catDogBreedsPageNumber}&limit=6`
      ),
    ]);

    const combinedRes = res.reduce(
      (result, item) => {
        console.log();
        return {
          rows: result.rows.concat(item.data),
          count: parseInt(
            item.headers["pagination-count"] > result.count
              ? item.headers["pagination-count"]
              : result.count
          ),
        };
      },
      {
        rows: [],
        count: 0,
      }
    );

    setCatDogBreedsMaxPage(combinedRes.count / 6);
    setCatDogBreeds(combinedRes.rows);
  };

  const getCatImagesByBreed = async () => {
    try {
      let res;
      if (!selectedCatBreed) {
        res = await axios.get(
          `https://api.thecatapi.com/v1/images/search?limit=10&page=0&order=ASC`
        );
      } else {
        res = await axios.get(
          `https://api.thecatapi.com/v1/images/search?breed_ids=${selectedCatBreed}&limit=10&page=${catImagesByBreedPageNumber}&order=ASC`,
          {
            headers: {
              "x-api-key": process.env.REACT_APP_THE_CAT_API_API_KEY,
            },
          }
        );
      }

      setCatImagesByBreedMaxPage(res.headers["pagination-count"] / 10);
      setCatImagesByBreed([...catImagesByBreed, ...res.data]);
    } catch (error) {}
  };

  console.log(catImagesByBreedMaxPage);

  const getDogImagesByBreed = async () => {
    try {
      let res;
      if (!selectedDogBreed) {
        res = await axios.get(
          `https://api.thedogapi.com/v1/images/search?limit=10&page=0&order=ASC`
        );
      } else {
        res = await axios.get(
          `https://api.thedogapi.com/v1/images/search?breed_ids=${selectedDogBreed}&limit=10&page=${dogImagesByBreedPageNumber}&order=ASC`,
          {
            headers: {
              "x-api-key": process.env.REACT_APP_THE_DOG_API_API_KEY,
            },
          }
        );
      }

      setDogImagesByBreed([...dogImagesByBreed, ...res.data]);
    } catch (error) {}
  };

  const getCatDogImages = async (catDogImageToViewID) => {
    let res;

    try {
      res = await axios.get(
        `https://api.thecatapi.com/v1/images/${catDogImageToViewID}`
      );
      setCatDogImageToView(res.data);
    } catch (error) {}
    try {
      res = await axios.get(
        `https://api.thedogapi.com/v1/images/${catDogImageToViewID}`
      );
      setCatDogImageToView(res.data);
    } catch (error) {}

    if (!catDogImageToViewID) setCatDogImageToView();
  };

  const changeCatDogBreeds = (newPageNumber) => {
    setCatDogBreedsPageNumber(newPageNumber);
    setCatDogBreedsTrigger((prevState) => !prevState);
  };

  useEffect(() => {
    getCatDogImages();
    getCatDogBreeds();
  }, [catDogBreedsTrigger]);

  useEffect(() => {
    getCatImagesByBreed();
  }, [catImagesByBreedTrigger]);

  useEffect(() => {
    getDogImagesByBreed();
  }, [dogImagesByBreedTrigger]);

  useEffect(() => {
    setCatImagesByBreed([]);
    setCatImagesByBreedPageNumber(0);
    setCatImagesByBreedTrigger((prevState) => !prevState);
  }, [selectedCatBreed]);

  useEffect(() => {
    setDogImagesByBreed([]);
    setDogImagesByBreedPageNumber(0);
    setDogImagesByBreedTrigger((prevState) => !prevState);
  }, [selectedDogBreed]);

  useEffect(() => {
    getCatDogImages(catDogImageToViewID)
  }, [catDogImageToViewID]);

  const value = {
    catDogBreeds,
    catDogBreedsPageNumber,
    catDogBreedsMaxPage,
    changeCatDogBreeds,
    dogImagesByBreed,
    catImagesByBreed,
    getCatImagesByBreed,
    getDogImagesByBreed,
    selectedCatBreed,
    selectedDogBreed,
    setSelectedCatBreed,
    setSelectedDogBreed,
    setCatImagesByBreedTrigger,
    setDogImagesByBreedTrigger,
    setCatImagesByBreedPageNumber,
    dogImagesByBreedPageNumber,
    catImagesByBreedPageNumber,
    setDogImagesByBreedPageNumber,
    catImagesByBreedMaxPage,
    setCatImagesByBreedMaxPage,
    datImagesByBreedMaxPage,
    setDogImagesByBreedMaxPage,
    catDogImageToView,
    setCatDogImageToView,
  };

  return (
    <CatDogContext.Provider value={value}>{children}</CatDogContext.Provider>
  );
};

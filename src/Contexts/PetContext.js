import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const PetContext = React.createContext();

export const usePetContext = () => useContext(PetContext);

export const PetProvider = ({ children }) => {
  const [petBreeds, setPetBreeds] = useState();
  const [petBreedsPageNumber, setPetBreedsPageNumber] = useState(0);
  const [petBreedsTrigger, setPetBreedsTrigger] = useState(false);
  const [petBreedsMaxPage, setPetBreedsMaxPage] = useState(0);
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
  const [petImageToView, setPetImageToView] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const petImageToViewID = searchParams.get("image_id");

  const getPetBreeds = async () => {
    const res = await Promise.all([
      axios.get(
        `https://api.thecatapi.com/v1/breeds?page=${petBreedsPageNumber}&limit=6`
      ),
      axios.get(
        `https://api.thedogapi.com/v1/breeds?page=${petBreedsPageNumber}&limit=6`
      ),
    ]);

    const combinedRes = res.reduce(
      (result, item) => {
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

    setPetBreedsMaxPage(combinedRes.count / 6);
    setPetBreeds(combinedRes.rows);
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

  const getPetImages = async (petImageToViewID) => {
    let res;

    try {
      res = await axios.get(
        `https://api.thecatapi.com/v1/images/${petImageToViewID}`
      );
      setPetImageToView(res.data);
    } catch (error) {}
    try {
      res = await axios.get(
        `https://api.thedogapi.com/v1/images/${petImageToViewID}`
      );
      setPetImageToView(res.data);
    } catch (error) {}

    if (!petImageToViewID) setPetImageToView();
  };

  const changePetBreeds = (newPageNumber) => {
    setPetBreedsPageNumber(newPageNumber);
    setPetBreedsTrigger((prevState) => !prevState);
  };

  useEffect(() => {
    getPetImages();
    getPetBreeds();
  }, [petBreedsTrigger]);

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
    getPetImages(petImageToViewID);
  }, [petImageToViewID]);

  const value = {
    petBreeds,
    petBreedsPageNumber,
    petBreedsMaxPage,
    changePetBreeds,
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
    petImageToView,
    setPetImageToView,
  };

  return <PetContext.Provider value={value}>{children}</PetContext.Provider>;
};

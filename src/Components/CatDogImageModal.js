import { useSearchParams } from "react-router-dom";
import { useCatDogContext } from "../Contexts/CatDogContext";

const CatDogImageModal = () => {
  const { catDogImageToView } = useCatDogContext();
  const [searchParams, setSearchParams] = useSearchParams();

  if (!catDogImageToView) return "";

  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingRight: "60px",
        paddingLeft: "60px",
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        backdropFilter: "blur(2px)",
        zIndex: "3",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: "40px",
          height: "40px",
          backgroundColor: "var(--bg-color-2)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "40px",
          top: "0",
          right: "0",
          marginTop: "10px",
          marginRight: "10px",
          cursor: "pointer",
        }}
        onClick={() => {
          searchParams.delete("image_id");
          setSearchParams(searchParams);
        }}
      >
        <i
          className="fa-solid fa-xmark"
          style={{
            fontSize: "20px",
          }}
        ></i>
      </div>
      <img
        src={catDogImageToView.url}
        alt=""
        style={{
          maxWidth: "100%",
          maxHeight: "100%",
        }}
      />
    </div>
  );
};

export default CatDogImageModal;

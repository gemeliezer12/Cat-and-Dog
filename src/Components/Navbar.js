import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div
      className="dark"
      style={{
        height: "70px",
        minHeight: "70px",
        width: "100%",
        backgroundColor: "var(--base-color-indigo)",
        display: "flex",
        position: "sticky",
        top: "0",
        zIndex: "2",
        paddingLeft: "32px",
        paddingRight: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "16px",
          alignItems: "center",
          fontSize: "26px",
          fontWeight: "700",
        }}
      >
        <Link
          to={"/"}
          style={{
            cursor: "pointer",
          }}
        >
          Home
        </Link>
        <Link
          to={"/cats"}
          style={{
            cursor: "pointer",
          }}
        >
          Cats
        </Link>
        <Link
          to={"/dogs"}
          style={{
            cursor: "pointer",
          }}
        >
          Dogs
        </Link>
      </div>
    </div>
  );
}

export default Navbar;

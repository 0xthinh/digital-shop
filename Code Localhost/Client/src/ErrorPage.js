const { default: Navbar } = require("./layout/NavBar");

const ErrorPage = () => {
  return (
    <div>
      <Navbar></Navbar>
      <h2 style={{ color: "red", textAlign: "center" }}>
        Something went wrong! <br /> Sorry for the convenience
      </h2>
    </div>
  );
};

export default ErrorPage;

import React from "react";


export default function Home() {
  return (
    <div
      className="container-fluid shadow-sm"
      style={{
        backgroundImage: "url(_veggie.png)",
        backgroundSize: "cover",
        backgroundPosition: "centre",
        height: "400px",
      }}
    >
      <div className="row ">
        <div className="col-md-6 ">
          <div className="mt-5 ms-2">
            <h3 className="mb-4" style={{ color: "#0da308" }}>Freshness at your doorstep</h3>

            <h1 className="fw-bold mb-4" style={{ color: "#2d362f" }}>
              shop smart,eat healthy
            </h1>

            <p className="col-10 mb-4" style={{ color: "#3a3d40" }}>
              <i>"Freshness and convenience, all in one place. Order your favorite
              groceries online and have them delivered right to your doorstep.
              Eat well, live well, and shop smart with us."</i>
            </p>
            <button className="btn btn-dark " >Shop Now </button>
          </div>
        </div>
        <div className="col-md-6"></div>
      </div>
    </div>
  );
}

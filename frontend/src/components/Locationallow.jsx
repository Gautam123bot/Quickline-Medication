import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Locationallow() {
  const [continuediv, showContinuediv] = useState(false);

//   const toggleVisibility = () => {
//     showContinuediv(!continuediv)
//   }

  const button = document.querySelector("button");
  const locationdiv = document.getElementById("location_details");

  button.addEventListener("click", () => {
    // console.log(navigator.geolocation);
    if (navigator.geolocation) {
      button.innerText = "Allow to detect location";
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    } else {
      button.innerText = "Your Browser Not Support";
    }
  });

  function onSuccess(position) {
    button.innerText = "Detecting your location...";
    console.log(position);
    let { latitude, longitude } = position.coords;

    console.log(latitude, longitude);

    // https://api.opencagedata.com/geocode/v1/json?q=LAT+LNG&key=

    const apikey = import.meta.env.VITE_OPENCAGE_GEOCODING_API;
    console.log(apikey);

    fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apikey}`
    )
      .then((response) => response.json())
      .then((result) => {
        let alldetails = result.results[0].components;

        let { county, postcode, country } = alldetails;
        console.log(county, postcode, country);
        // locationdiv.innerText = `${county} ${postcode}, ${country}`;
        locationdiv.innerText = showContinuediv(!continuediv);


        console.table(alldetails);
        button.innerText = "Detect Your Location";
      })
      .catch(() => {
        button.innerText = "Something went wrong";
      });
  }

  function onError(error) {
    // console.log(error);
    if (error.code == 1) {
      button.innerText = "You Denied Request";
    } else if (error.code == 2) {
      button.innerText = "Location Not Availabe";
    } else {
      button.innerText = "Something went wrong";
    }
    button.setAttribute("disabled", "true");
  }

  return (
    <>
      <div className="text-center text-white font-medium text-2xl w-full">
        <h1 className="text-4xl">Login success...</h1>
        <div className="img-section flex align-middle justify-center">
          <div className="secondinimg">
            <img src="/src/Assets/front-ambulance.png" alt="" />
          </div>
          <div className="firstinimg">
            <img className="h-auto w-48" src="/src/Assets/logo.png" alt="" />
          </div>
        </div>

        <button className="underline">Detect your location</button>
        <br />

        {/* <div id="location_details"></div> */}
      </div>

      {/* <button onClick={toggleVisibility}>Toggle Visibility</button> */}
        {continuediv && (
            <div className="bg-green-200 text-black text-3xl underline w-full mt-6 text-center">
                <Link to="/home"> Click here to continue with our application...</Link>
            </div>
          )}
    </>
  );
}

export default Locationallow;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../Styles/AppointmentForm.css";
import { ToastContainer, toast } from "react-toastify";

function sendSOS() {
  var a = document.getElementById("name").value;
  var b = document.getElementById("phone").value;
  var c = document.getElementById("email").value;
  var d = document.getElementById("gender").value;
  // Replace these values with your Twilio credentials
  const accountSid = import.meta.env.VITE_TWILIO_SID;
  const authToken = import.meta.VITE_TWILIO_AUTH_TOKEN;
  const phoneNumber = import.meta.env.VITE_TO_PHONE_NUMBER; // Replace with the actual phone number

  const message = `SOS! This is an emergency message. Name - ${a} Phone Number - ${b} Email Id - ${c} Gender - ${d}`;

  fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + btoa(`${accountSid}:${authToken}`),
      },
      body: new URLSearchParams({
        To: phoneNumber,
        From: import.meta.env.VITE_FROM_PHONE_NUMBER, // Replace with your Twilio phone number
        Body: message,
      }),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      console.log("Message sent successfully:", data);
      alert("SOS message sent!");
    })
    .catch((error) => {
      console.error("Error sending message:", error);
      alert("Failed to send SOS message.");
    });
}

function AppointmentForm() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  const [patientName, setPatientName] = useState("");
  const [patientNumber, setPatientNumber] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [patientGender, setPatientGender] = useState("default");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [preferredMode, setPreferredMode] = useState("default");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form inputs
    const errors = {};
    if (!patientName.trim()) {
      errors.patientName = "Patient name is required";
    } else if (patientName.trim().length < 4) {
      errors.patientName = "Patient name must be at least 8 characters";
    }

    if (!patientNumber.trim()) {
      errors.patientNumber = "Patient phone number is required";
    } else if (patientNumber.trim().length !== 10) {
      errors.patientNumber = "Patient phone number must be of 10 digits";
    }

    // if (patientEmail.trim()) {
    //   errors.patientEmail = "";
    // } else if (patientEmail.trim().length !== 10) {
    //   errors.patientEmail = "";
    // }

    if (patientGender === "default") {
      errors.patientGender = "Please select patient gender";
    }
    if (!appointmentTime) {
      errors.appointmentTime = "Appointment time is required";
    } else {
      const selectedTime = new Date(appointmentTime).getTime();
      const currentTime = new Date().getTime();
      if (selectedTime <= currentTime) {
        errors.appointmentTime = "Please select a future appointment time";
      }
    }
    if (preferredMode === "default") {
      errors.preferredMode = "Please select preferred mode";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Reset form fields and errors after successful submission
    setPatientName("");
    setPatientNumber("");
    setPatientEmail("");
    setPatientGender("default");
    setAppointmentTime("");
    setPreferredMode("default");
    setFormErrors({});

    toast.success("Appointment Scheduled !", {
      position: toast.POSITION.TOP_CENTER,
      onOpen: () => setIsSubmitted(true),
      onClose: () => setIsSubmitted(false),
    });
  };

  return (
    <div className="appointment-form-section bg-teal-500">
      <h1 className="legal-siteTitle text-center flex items-center justify-center bg-teal-500">
        <Link to="/home">
          <img className="text-center w-28" src="/src/Assets/logo.png" alt="" />
        </Link>
      </h1>

      <div className="form-container">
        <h2 className="form-title">
          <span>Book Ambulance</span>
        </h2>

        <form className="form-content" onSubmit={handleSubmit}>
          <label className="formlabel">
            Patient Full Name:
            <input
              type="text"
              value={patientName}
              name="name"
              id="name"
              onChange={(e) => setPatientName(e.target.value)}
              required
            />
            {formErrors.patientName && (
              <p className="error-message">{formErrors.patientName}</p>
            )}
          </label>

          {/* <br /> */}
          <label className="formlabel">
            Patient Phone Number:
            <input
              type="text"
              name="phone"
              id="phone"
              value={patientNumber}
              onChange={(e) => setPatientNumber(e.target.value)}
              required
            />
            {formErrors.patientNumber && (
              <p className="error-message">{formErrors.patientNumber}</p>
            )}
          </label>

          {/* <br /> */}
          <label>
            Patient Email Id:
            <input
              type="email"
              name="email"
              id="email"
              value={patientEmail}
              onChange={(e) => setPatientEmail(e.target.value)}
            />
            {formErrors.patientEmail && (
              <p className="error-message">{formErrors.patientEmail}</p>
            )}
          </label>

          {/* <br /> */}
          <label className="formlabel">
            Patient Gender:
            <select
              value={patientGender}
              name="gender"
              id="gender"
              onChange={(e) => setPatientGender(e.target.value)}
              required
            >
              <option value="default">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="private">Others</option>
            </select>
            {formErrors.patientGender && (
              <p className="error-message">{formErrors.patientGender}</p>
            )}
          </label>

          <br />
          {/* <label>
            Preferred Appointment Time:
            <input
              type="datetime-local"
              value={appointmentTime}
              onChange={(e) => setAppointmentTime(e.target.value)}
              required
            />
            {formErrors.appointmentTime && <p className="error-message">{formErrors.appointmentTime}</p>}
          </label> */}

          {/* <br /> */}
          {/* <label>
            Preferred Mode:
            <select
              value={preferredMode}
              onChange={(e) => setPreferredMode(e.target.value)}
              required
            >
              <option value="default">Select</option>
              <option value="voice">Voice Call</option>
              <option value="video">Video Call</option>
            </select>
            {formErrors.preferredMode && <p className="error-message">{formErrors.preferredMode}</p>}
          </label> */}

          <button
            onClick={sendSOS}
            type="submit"
            className="text-appointment-btn"
          >
            Confirm Booking
          </button>

          <p
            className="success-message"
            style={{ display: isSubmitted ? "block" : "none" }}
          >
            Appointment details has been sent to the patients phone number via
            SMS.
          </p>
        </form>
      </div>

      <div className="legal-footer">
        <p>© 2013-2023 Health+. All rights reserved.</p>
      </div>

      <ToastContainer autoClose={5000} limit={1} closeButton={false} />
    </div>
  );
}

export default AppointmentForm;

import { signInWithPhoneNumber } from "firebase/auth";
import React from "react";
// import Login from '../components/Login';
import { getAuth, RecaptchaVerifier } from "firebase/auth";
import { useState } from "react";
import OtpInput from "otp-input-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "./firebase.config";
import { Link } from "react-router-dom";


function Loginpage() {
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);

  function onCaptchVerify(){
    if(!window.recaptchaVerifier){
        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
            'size': 'invisible',
            'callback': (response) => {
                onSignup()
            },
            'expired-callback': () => {}
          }, auth);
    }
  }

  function onSignup(){
    setLoading(true)
    onCaptchVerify()

    const appVerifier = window.recaptchaVerifier

    const formatPh = '+' + ph

    signInWithPhoneNumber(auth, formatPh, appVerifier)
    .then((confirmationResult) => {
      window.confirmationResult = confirmationResult;
      setLoading(false);
      setShowOTP(true);
    //   toast.success('OTP sended succwssfully!');
    }).catch((error) => {
      console.log(error)
      setLoading(false)
    });
  }

  function onOTPVerify(){
    setLoading(true)
    window.confirmationResult.confirm(otp).then(async(res)=>{
        console.log(res);
        setUser(res.user);
        setLoading(false);
    }).catch(err=>{
        console.log(err);
        setLoading(false);
    })
  }

  return (
    <section className="bg-emerald-500 flex items-center justify-center h-screen">
      <div>
        {/* <Toaster toastOptions={{duration: 4000}} /> */}
        <div id="recaptcha-container"></div>
        {
            !user ? (
            <div className="w-80 flex flex-col gap-4 rounded-lg p-4">
            <h1 className="text-center loading-normal text-white font-medium text-3xl mb-6">
                Welcome to <br /> CODE A PROGRAM
            </h1>
            { 
                showOTP ? 
            <>
                <label
                htmlFor="otp"
                className="font-bold text-xl text-white text-center"
                >
                Enter your OTP
                </label>
                <OtpInput
                value={otp}
                onChange={setOtp}
                OTPLength={6}
                otpType="number"
                disabled={false}
                autoFocus
                ></OtpInput>
                <button onClick={onOTPVerify} className="bg-emerald-600 w-full flex gap1 items-center justify-center py-2.5 text-white rounded">
                <span>Verify OTP</span>
                </button>
            </> : 
            <>
                <label
                htmlFor="ph"
                className="font-bold text-xl text-white text-center"
                >
                Verify your phone number
                </label>
                <PhoneInput country={"in"} value={ph} onChange={setPh} />
                <button onClick={onSignup} className="bg-emerald-600 w-full flex gap1 items-center justify-center py-2.5 text-white rounded">
                <span>Send code via SMS</span>
                </button>
            </>
            }
            
            </div>
            ) : 
            (
                <h2 className="text-center text-white font-medium text-2xl">
                    Login success...
                    <button><Link to="/home">Click here to continue...</Link></button>
                </h2>

            )
        }
      </div>
    </section>
  );
}

export default Loginpage;

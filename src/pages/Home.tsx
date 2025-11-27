import { Link } from "react-router-dom";
import logoImage from "../assets/kyc-logo.png";

const Home = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-10">
        <img
          src={logoImage}
          alt="Logo"
          className="w-24 h-24 mx-auto mb-4 object-contain"
        />
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
          Simple KYC <span className="text-blue-600">Solution</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Verify customer identity quickly, safely and securely
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
        <Link
          to="/login"
          className="flex-1 py-4 px-6 bg-blue-600 text-white text-center font-bold rounded-xl shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all transform hover:-translate-y-1"
        >
          Login
        </Link>

        <Link
          to="/register"
          className="flex-1 py-4 px-6 bg-white text-blue-600 text-center font-bold rounded-xl shadow-md border border-gray-200 hover:bg-gray-50 hover:shadow-lg transition-all transform hover:-translate-y-1"
        >
          Create Account
        </Link>
      </div>
    </div>
  );
};

export default Home;

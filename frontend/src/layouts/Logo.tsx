import { Link } from "react-router-dom";
import logo from "../assets/ALF_logo.png";

export default function Logo() {
  return (
    <Link
      to="/dashboard"
      className="flex items-center gap-3"
    >
      <img
        src={logo}
        className="h-10 w-10 object-contain"
      />

      <span className="text-xl font-bold">
        ALF
      </span>
    </Link>
  );
}
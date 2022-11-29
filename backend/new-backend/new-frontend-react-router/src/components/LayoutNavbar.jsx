import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoffee,
  faCalculator,
  faUserNinja,
  faDollarSign,
  faStarAndCrescent,
} from "@fortawesome/free-solid-svg-icons";

function NavbarLogo() {
  return (
    <div className="sm:w-64 h-16 bg-yellow-950 flex items-center justify-center border-b-4 sm:border-0 border-blue-750">
      <span className="text-4xl pr-3">Trady</span>
      <FontAwesomeIcon icon={faStarAndCrescent} size="2x" />
    </div>
  );
}

function NavbarControls() {
  return (
    <div className="sm:w-96 h-16 bg-yellow-950">
      <div className="w-full h-full flex gap-2 justify-center items-center">
        <button className="w-24 h-10 border-solid border-2 border-blue-850">
          <FontAwesomeIcon icon={faDollarSign} />
          New Trade
        </button>
        <button className="w-12 h-10 border-solid border-2 border-blue-850 bg-red-800">
          <FontAwesomeIcon icon={faCalculator} />
        </button>
        <button className="w-12 h-10 border-solid border-2 border-blue-850 bg-red-800">
          <FontAwesomeIcon icon={faCoffee} />
        </button>
        <button className="w-32 h-10 border-solid border-2 border-blue-850 bg-red-800">
          Profile <FontAwesomeIcon icon={faUserNinja} size="lg" />
        </button>
      </div>
    </div>
  );
}

function NavBar() {
  return (
    <div className="h-32 sm:h-16 w-full flex flex-col sm:flex-row justify-between bg-blue-950">
      <NavbarLogo />
      <NavbarControls />
    </div>
  );
}

export default NavBar;

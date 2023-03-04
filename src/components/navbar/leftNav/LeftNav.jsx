import React, { useContext } from "react";

// react-router
import { useNavigate, Link } from "react-router-dom";

import toast from "react-hot-toast";

// components
import LeftNavMenuItem from "./LeftNavMenuItem";

import { ImSwitch } from "react-icons/im";

// utilities
import { categories } from "../../../utils/constants";

// context
import { Context } from "../../../context/contextApi";
import { UserContext } from "../../../context/userContext";

const LeftNav = () => {
  const { selectedCategory, setSelectedCategory, mobileMenu } =
    useContext(Context);

  const userContext = useContext(UserContext);

  const navigate = useNavigate();

  const clickHandler = (name, type) => {
    switch (type) {
      case "category":
        return setSelectedCategory(name);
      case "home":
        return setSelectedCategory(name);
      case "menu":
        return false;
      default:
        break;
    }
  };

  return (
    <div
      className={`md:block w-[240px] overflow-y-auto h-full py-4 bg-black absolute md:relative z-10 translate-x-[-240px] md:translate-x-0 transition-all ${ mobileMenu ? "translate-x-0" : ""}`}
    >
      <div className="flex px-5 flex-col">
        {categories.map((item) => {
          return (
            <React.Fragment key={item.name}>
              <LeftNavMenuItem
                text={item.type === "home" ? "Home" : item.name}
                icon={item.icon}
                action={() => {
                  clickHandler(item.name, item.type);
                  navigate("/home"); // ("/")
                }}
                className={`${
                  selectedCategory === item.name ? "bg-white/[0.15]" : ""
                }`}
              />
              {item.divider && <hr className="my-5 border-white/[0.2]" />}
            </React.Fragment>
          );
        })}
        <hr className="my-4 border-white/[0.2]" />
        <div className="text-white/[0.5] text-[12px]">
          <Link
            to="/signin"
            onClick={() => {
              userContext.setUser(null);
              toast.success("Logout Successfull !");
            }}
            className="flex justify-center"
          >
            <ImSwitch
              className="text-white text-xl cursor-pointer mr-2"
              title="Log Out"
            />{" "}
            LOGOUT
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LeftNav;

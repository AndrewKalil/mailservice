import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TokenService } from "../../services/LocalStorage";

//logo
import Logo from "../../components/Svg/logo.svg";

// Auth store
import {
  checkToken,
  login,
  selectUser,
  setError,
} from "../../store/modules/AuthStore";

//widgets
import Loader from "react-loader-spinner";

export const Login = () => {
  const user = useSelector(selectUser);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(true);

  const [visibility, setVisibility] = useState(false);
  const [newError, setNewError] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (TokenService.get() !== "") {
      dispatch(checkToken());
    }
    setLoader(false);
  }, [dispatch]);

  const onSubmit = (e: any): void => {
    e.preventDefault();
    dispatch(
      login({
        username: username,
        password: password,
      })
    );
  };

  useEffect(() => {
    if (user.count === 3) {
      setNewError(true);
      dispatch(setError(""));
      setUsername("");
      setPassword("");
    }
  }, [user.count, dispatch]);

  //   const { t } = useTranslation();

  return (
    <div className="w-full h-screen flex justify-center items-center bg-login bg-cover">
      {loader ? (
        <div className="p-4">
          <Loader type="TailSpin" color="#4f46e5" height={100} width={100} />
        </div>
      ) : (
        <div className="w-96 bg-white rounded-lg p-4 ">
          <div className="flex justify-center items-center my-7 text-aciano">
            <img className="h-16 fill-current" src={Logo} alt="Helppeople" />
          </div>
          <div className="mb-4">
            <label
              className="block text-md font-semibold mb-2 text-space"
              htmlFor="username"
            >
              {"labelUsername"}
            </label>
            <input
              className="w-full bg-drabya-gray border-space appearance-none border p-4 font-light leading-tight focus:outline-none focus:shadow-outline rounded-xl"
              type="text"
              name="username"
              placeholder="john.doe"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-md font-semibold mb-2 text-space"
              htmlFor="password"
            >
              {"labelPassword"}
            </label>
            <div className="relative mb-2">
              <input
                type={`${visibility ? "text" : "password"}`}
                className=" rounded-xl w-full pl-4 pr-10 py-4 bg-gray font-light leading-tight border border-space focus:outline-none focus:border-indigo-500 transition-colors"
                placeholder="***"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                onClick={(e) => {
                  setVisibility((prev) => {
                    return !prev;
                  });
                }}
                className="block w-7 h-7 text-center text-xl leading-0 absolute top-3 right-4 text-gray-400 focus:outline-none hover:text-indigo-500 transition-colors"
              >
                {!visibility ? (
                  <span className="h-2 text-space">
                    <svg
                      className="fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 469.333 469.333"
                    >
                      <path d="M234.667 170.667c-35.307 0-64 28.693-64 64s28.693 64 64 64 64-28.693 64-64-28.694-64-64-64z" />
                      <path d="M234.667 74.667C128 74.667 36.907 141.013 0 234.667c36.907 93.653 128 160 234.667 160 106.773 0 197.76-66.347 234.667-160-36.907-93.654-127.894-160-234.667-160zm0 266.666c-58.88 0-106.667-47.787-106.667-106.667S175.787 128 234.667 128s106.667 47.787 106.667 106.667-47.787 106.666-106.667 106.666z" />
                    </svg>
                  </span>
                ) : (
                  <span className="h-2 text-space">
                    <svg
                      className="fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 469.44 469.44"
                    >
                      <path d="M231.147 160.373l67.2 67.2.32-3.52c0-35.307-28.693-64-64-64l-3.52.32z" />
                      <path d="M234.667 117.387c58.88 0 106.667 47.787 106.667 106.667 0 13.76-2.773 26.88-7.573 38.933l62.4 62.4c32.213-26.88 57.6-61.653 73.28-101.333-37.013-93.653-128-160-234.773-160-29.867 0-58.453 5.333-85.013 14.933l46.08 45.973c12.052-4.693 25.172-7.573 38.932-7.573zM21.333 59.253l48.64 48.64 9.707 9.707C44.48 145.12 16.64 181.707 0 224.053c36.907 93.653 128 160 234.667 160 33.067 0 64.64-6.4 93.547-18.027l9.067 9.067 62.187 62.293 27.2-27.093L48.533 32.053l-27.2 27.2zM139.307 177.12l32.96 32.96c-.96 4.587-1.6 9.173-1.6 13.973 0 35.307 28.693 64 64 64 4.8 0 9.387-.64 13.867-1.6l32.96 32.96c-14.187 7.04-29.973 11.307-46.827 11.307-58.88 0-106.667-47.787-106.667-106.667 0-16.853 4.267-32.64 11.307-46.933z" />
                    </svg>
                  </span>
                )}
              </button>
            </div>
          </div>

          {/*
          <div className="mb-4">
            <label
              className="block text-md font-semibold mb-2"
              htmlFor="language"
            >
              {t("labelLanguage")}
            </label>
            <select
              className="w-full bg-drabya-gray border-gray-500 appearance-none border p-4 font-light leading-tight focus:outline-none focus:shadow-outline"
              name="language"
              value={language}
              onChange={(e) => handleLanguage(e.target.value)}
            >
              <option value="es">Español</option>
              <option value="en">English</option>
              <option value="pt">Português</option>
            </select>
          </div>
          */}

          {newError ? (
            <div className="text-center text-red-700 font-medium my-4">
              Por favor vuelva a intentarlo
            </div>
          ) : (
            <></>
          )}

          {user.error === "error" ? (
            <div className="text-center text-red-600 bg-red-100 font-medium my-4 ">
              Usuario o contraseña incorrecto. Intento #{user.count}
            </div>
          ) : (
            <></>
          )}

          <div className="flex items-center flex-col mb-5">
            <button
              onClick={(e) => onSubmit(e)}
              className="flex items-center  gap-2 bg-naranja px-12 text-lg font-title py-2 rounded-md text-white border hover:border-naranja hover:bg-white hover:text-naranja "
            >
              {"buttonLogin"}
            </button>
            {/* <Link
              to="/recover"
              className="inline-block align-baseline font-semibold text-sm text-indigo-600 hover:text-indigo-500 mt-6"
              href="#"
            >
              {t("textRecovery")}
            </Link> */}
          </div>
        </div>
      )}
    </div>
  );
};

import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import "./App.css";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import Register from "../RegisterModal/RegisterModal.jsx";
import Login from "../LoginModal/LoginModal.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import EditProfileModal from "../EditProfileModal/EditProfileModal.jsx";
import auth from "../../utils/auth.js";
import { checkToken } from "../../utils/auth.js";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";

import { filterWeatherData, getWeather } from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import {
  deleteCard,
  getItems,
  addItem,
  addCardLike,
  removeCardLike,
  updateProfile,
} from "../../utils/api.js";
import { coordinates, APIkey } from "../../utils/constants";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: false,
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [clothingItems, setClothingItems] = useState([]);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);

  const navigate = useNavigate();

  const setToken = (token) => {
    localStorage.setItem("token", token);
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleRegistrationClick = () => {
    setActiveModal("register");
  };

  const handleLoginClick = () => {
    setActiveModal("login");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleAddItemModalSubmit = async ({ name, imageUrl, weather }) => {
    const token = localStorage.getItem("token");
    try {
      const item = await addItem({ name, imageUrl, weather, token });
      setClothingItems((prevItems) => [item.data, ...prevItems]);
      closeActiveModal();
    } catch (error) {
      console.error("Failed to add item:", error);
    }
  };

  const handleDeleteCard = async (item) => {
    const token = localStorage.getItem("token");

    try {
      await deleteCard({ id: item._id, token });

      setClothingItems((prevItems) =>
        prevItems.filter((card) => item._id !== card._id)
      );
      closeActiveModal();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        console.log("API response structure:", data);
        setClothingItems(data.data);
        console.log("Individual items in data.data:", data.data[0]);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      checkToken(token)
        .then((data) => {
          if (data && data._id) {
            setCurrentUser(data);
            setIsLoggedIn(true);
          } else {
            throw new Error("Token is invalid or user data missing");
          }
        })
        .catch((error) => {
          console.error("Token validation failed:", error);
        });
    }
  }, []);

  const handleRegistration = async ({ name, avatar, email, password }) => {
    if (!name || !password || !email || !avatar) return;

    try {
      await auth.register(name, password, email, avatar);
      await handleLogin({ email, password });
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const handleLogin = async ({ email, password }) => {
    if (!email || !password) {
      return;
    }
    try {
      console.log("About to call auth.login with:", email, password);
      const data = await auth.login(email, password);
      if (data.token) {
        checkToken(data.token)
          .then((userData) => {
            setToken(data.token);
            setIsLoggedIn(true);
            setCurrentUser(userData);
            closeActiveModal();
            navigate("/profile");
          })
          .catch((error) => {
            console.error("Token validation failed:", error);
          });
      } else {
        console.log("No token found in response");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditProfile = () => {
    setIsEditProfileModalOpen(true);
  };

  const handleUpdateUser = ({ name, avatar }) => {
    const token = localStorage.getItem("token");

    updateProfile(name, avatar, token)
      .then((data) => {
        setCurrentUser(data);
        setIsEditProfileModalOpen(false);
      })
      .catch((error) => {
        console.error("Profile update failed:", error);
      });
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("token");
    console.log("About to", isLiked ? "remove" : "add", "like for item:", id);
    !isLiked
      ? addCardLike(id, token)
          .then((data) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? data.data : item))
            );
          })
          .catch((err) => console.log(err))
      : removeCardLike(id, token)
          .then((data) => {
            console.log("removeCardLike response:", data);
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? data.data : item))
            );
          })
          .catch((err) => console.log(err));
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setCurrentUser({});
    navigate("/");
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page">
          <div className="page__content">
            <Header
              isLoggedIn={isLoggedIn}
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              handleRegistrationClick={handleRegistrationClick}
              handleLoginClick={handleLoginClick}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onDeleteItem={handleDeleteCard}
                    handleCardLike={handleCardLike}
                    isLoggedIn={isLoggedIn}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      weatherData={weatherData}
                      clothingItems={clothingItems}
                      handleCardClick={handleCardClick}
                      handleAddClick={handleAddClick}
                      onDeleteItem={handleDeleteCard}
                      handleEditProfile={handleEditProfile}
                      handleCardLike={handleCardLike}
                      handleSignOut={handleSignOut}
                      isLoggedIn={isLoggedIn}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Footer />
          </div>
          <AddItemModal
            onClose={closeActiveModal}
            isOpen={activeModal === "add-garment"}
            onAddItemModalSubmit={handleAddItemModalSubmit}
          />
          <ItemModal
            card={selectedCard}
            onClose={closeActiveModal}
            isOpen={activeModal === "preview"}
            onDeleteItem={handleDeleteCard}
            selectedCard={selectedCard}
          />
          <Register
            path="/register"
            onClose={closeActiveModal}
            isOpen={activeModal === "register"}
            handleRegistrationClick={handleRegistrationClick}
            handleRegistration={handleRegistration}
            handleLoginClick={handleLoginClick}
            onSwitch={handleLoginClick}
            activeModal={activeModal}
          />
          <Login
            path="/login"
            onClose={closeActiveModal}
            isOpen={activeModal === "login"}
            handleLogin={handleLogin}
            handleLoginClick={handleLoginClick}
            handleRegistrationClick={handleRegistrationClick}
            onSwitch={handleRegistrationClick}
            activeModal={activeModal}
          />
          <EditProfileModal
            isOpen={isEditProfileModalOpen}
            onClose={() => setIsEditProfileModalOpen(false)}
            onUpdateUser={handleUpdateUser}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;

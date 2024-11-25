import React from "react";
import { motion } from "framer-motion";
import "./Homepage.css";
import { useNavigate } from "react-router-dom";


function Homepage() {
  const navigate=useNavigate();
  const handleloginClick=()=>{navigate("/Login");}
  const handleAdminClick=()=>{navigate("/Admin");}
  const handleAllMenuUserClick=()=>{navigate("/AllMenuUser");}
  
  return (
    <div className="restaurant-management">
      {/* Header Section */}
      <header className="header">
        <h1 className="header-title">Restaurant Management System</h1>
        <nav className="header-nav">
          <button className="header-button" onClick={handleAllMenuUserClick}>See the Item Price</button>
          
          <button className="header-button" onClick={handleloginClick}>Login</button>
          <button className="header-button" onClick={handleAdminClick}>Admin</button>
         
        </nav>
      </header>

      {/* Food and Beverage Section */}
      <div className="food-beverage-section">
        {/* Food Image 1 */}
        <motion.div
          className="food-item"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <img
            src="https://images5.alphacoders.com/415/415257.jpg"
            alt="Food 1"
            className="food-image"
          />
          <p>Steamed Cheese Burger</p>
        </motion.div>

        {/* Food Image 2 */}
        <motion.div
          className="food-item"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <img
            src="https://th.bing.com/th/id/R.783ecca519ae0a9e6828595c7682a6bb?rik=1TysI%2flq4qz5hw&riu=http%3a%2f%2fwww.pixelstalk.net%2fwp-content%2fuploads%2f2016%2f08%2fFast-food-backgrounds-free-download.jpg&ehk=VN0hGMNRFLcAvvFfp4ePGsV38KfupnWKf0jLzqcaS90%3d&risl=&pid=ImgRaw&r=0"
            alt="Food 2"
            className="food-image"
          />
          <p>Kiwi Burger</p>
        </motion.div>

        {/* Beverage Image 1 */}
        <motion.div
          className="food-item"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <img
            src="https://www.sabornamesa.com.br/media/k2/items/cache/65eb99de7f31e7479a8853734ca0c7ac_XL.jpg"
            alt="Beverage 1"
            className="food-image"
          />
          <p> Mojito</p>
        </motion.div>

        {/* Food Image 3 */}
        <motion.div
          className="food-item"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <img
            src="https://www.thespruceeats.com/thmb/SalyKjzBU-K1Bv-FTFWnbd6ckjY=/2121x1414/filters:fill(auto,1)/GettyImages-639704020-5c4a63ecc9e77c00017bfebf.jpg"
            alt="Food 3"
            className="food-image"
          />
          <p>Chicken Dum Briyani</p>
        </motion.div>

        {/* Beverage Image 2 */}
        <motion.div
          className="food-item"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <img
            src="https://img.freepik.com/premium-photo/fast-food-burger-drink-potato_69112-2900.jpg"
            alt="Beverage 2"
            className="food-image"
          />
          <p>High Tea Platter</p>
        </motion.div>

        {/* Food Image 4 */}
        <motion.div
          className="food-item"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <img
            src="https://t3.ftcdn.net/jpg/04/41/20/18/360_F_441201852_XQqp1wbAQj9udOC3iT7D0ahKgaf71bns.jpg"
            alt="Food 4"
            className="food-image"
          />
          <p>Tandoori Chicken Briyani</p>
        </motion.div>
        {/* Food Image 5 */}
        <motion.div
          className="food-item"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <img
            src="https://i.pinimg.com/736x/62/a9/5f/62a95f8106cf09033fe9cc1f485e6fc8.jpg"
            alt="Food 5"
            className="food-image"
          />
          <p>Mix Fruit Platter</p>
        </motion.div>
        {/* Food Image 6 */}
        <motion.div
          className="food-item"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <img
            src="https://t3.ftcdn.net/jpg/04/41/20/18/360_F_441201852_XQqp1wbAQj9udOC3iT7D0ahKgaf71bns.jpg"
            alt="Food 6"
            className="food-image"
          />
          <p>Chettinad Chicken Dum Briyani</p>
        </motion.div>

        {/*food 7*/}
        <motion.div
          className="food-item"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <img
            src="https://th.bing.com/th/id/OIP.y5CYrhnDFf6FbzCw7pCVWgHaE8?rs=1&pid=ImgDetMain"
            alt="Food 7"
            className="food-image"
          />
          <p>Cheese Burger</p>
        </motion.div>
        {/* Food Image 8 */}
        <motion.div
          className="food-item"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <img
            src="https://recipesofhome.com/wp-content/uploads/2020/08/chicken-65-recipe-1536x1024.jpg"
            alt="Food 8"
            className="food-image"
          />
          <p>Chicken 65</p>
        </motion.div>
        {/* Food Image 9 */}
        <motion.div
          className="food-item"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <img
            src="https://pakistanichefs.com/wp-content/uploads/2023/05/MG_0242-scaled-1.jpg"
            alt="Food 9"
            className="food-image"
          />
          <p>Tandoori Chicken</p>
        </motion.div>
        {/* Food Image 10 */}
        <motion.div
          className="food-item"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <img
            src="https://mokchicafe.in/wp-content/uploads/2023/07/DSC05349-1536x1024.jpg"
            alt="Food 10"
            className="food-image"
          />
          <p>Chiken Lollipop</p>
        </motion.div>
        {/* Food Image 11 */}
        <motion.div
          className="food-item"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <img
            src="https://th.bing.com/th/id/OIP.ieBVXzND9LPGNsvJ_PvgPwHaFj?w=3000&h=2250&rs=1&pid=ImgDetMain"
            alt="Food 6"
            className="food-image"
          />
          <p>Tandoori Platter</p>
        </motion.div>
        {/* Food Image 12 */}
        <motion.div
          className="food-item"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <img
            src="https://th.bing.com/th/id/OIP.7fZaNvd_N5nbHA5KIhwh3wHaEK?rs=1&pid=ImgDetMain"
            alt="Food 12"
            className="food-image"
          />
          <p>Mutton Keema Parata</p>
        </motion.div>
        {/* Food Image 13 */}
        <motion.div
          className="food-item"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <img
            src="https://i.ytimg.com/vi/E1aevWZFIg8/maxresdefault.jpg"
            alt="Food 13"
            className="food-image"
          />
          <p>Keema Parata</p>
        </motion.div>
        {/* Food Image 14 */}
        <motion.div
          className="food-item"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <img
            src="https://img.freepik.com/premium-photo/keema-paratha-chicken-mutton-mince-stuffed-flatbread_466689-80917.jpg?w=2000"
            alt="Food 14"
            className="food-image"
          />
          <p>Chicken Stuff Parata</p>
        </motion.div>
        {/* Food Image 15 */}
        <motion.div
          className="food-item"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <img
            src="https://i.pinimg.com/originals/c3/fc/68/c3fc68c3484c6e557c8ac211e956291e.jpg"
            alt="Food 15"
            className="food-image"
          />
          <p>Paneer Stuff Parata</p>
        </motion.div>
        {/* Food Image 16 */}
        <motion.div
          className="food-item"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <img
            src="https://www.tamarindnthyme.com/wp-content/uploads/2021/02/Cheesy-Garlic-Naan-Bread1-640x640.jpg"
            alt="Food 16"
            className="food-image"
          />
          <p>Cheese Naan</p>
        </motion.div>
        {/* Food Image 17 */}
        <motion.div
          className="food-item"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <img
            src="https://www.shutterstock.com/image-photo/indian-naan-bread-close-view-600nw-2142793201.jpg"
            alt="Food 6"
            className="food-image"
          />
          <p>Garlic Naan</p>
        </motion.div>
        {/* Food Image 17 */}
        <motion.div
          className="food-item"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <img
            src="https://th.bing.com/th/id/OIP.cJ_YxiIrTpQMI1IMYV4aNAHaFj?w=800&h=600&rs=1&pid=ImgDetMain"
            alt="Food 17"
            className="food-image"
          />
          <p>Cheese&Chilli Naan</p>
        </motion.div>
        

      </div>
    </div>
  );
}

export default Homepage;

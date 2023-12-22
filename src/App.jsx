import { useState } from "react";
import "./App.css";
import products from "./data/products";
function App() {
  const [displayProduct, setDisplayProduct] = useState([...products]);
  const [cart, setCart] = useState([]);
  function handleAddToCart(index) {
    const newProductInCart = displayProduct[index];
    newProductInCart.quantity
      ? (newProductInCart.quantity += 1)
      : (newProductInCart.quantity = 1);
    cart.includes(newProductInCart)
      ? setCart([...cart])
      : setCart([...cart, newProductInCart]);
  }

  function handleAddQuantity(index) {
    const productInCart = [...cart];
    productInCart[index].quantity += 1;
    setCart([...productInCart]);
  }
  function handleSubtractQuantity(index) {
    const productInCart = [...cart];
    if (productInCart[index].quantity === 1) {
      handleRemove(index);
    } else {
      productInCart[index].quantity -= 1;
      setCart([...productInCart]);
    }
  }
  function handleRemove(index) {
    const productInCart = [...cart];
    productInCart[index].quantity = 0;
    setCart(productInCart.filter((_, i) => i !== index));
  }
  return (
    <div className="App">
      <section className="product-container">
        <h1 className="product-heading">Products</h1>
        <div className="product-list">
          {displayProduct.map((item, index) => {
            return (
              <div className="product" key={index}>
                <img src={item.image} alt={item.name} />
                <h2>{item.name}</h2>
                <p>{item.description}</p>
                <button
                  onClick={() => {
                    handleAddToCart(index);
                  }}
                >
                  Add to cart
                </button>
              </div>
            );
          })}
        </div>
      </section>
      <hr />

      <section className="cart">
        <h1 className="cart-heading">
          Cart (Total Price is{" "}
          {cart.reduce((acc, curr) => {
            return (acc += curr.price * curr.quantity);
          }, 0)}{" "}
          Baht)
        </h1>
        <div className="cart-item-list">
          {cart.map((item, index) => {
            return (
              <div className="cart-item" key={index}>
                <h1>Item name: {item.name}</h1>
                <h2>Price: {item.price} Baht</h2>
                <h2>Quantity: {item.quantity}</h2>
                <button
                  className="delete-button"
                  onClick={() => {
                    handleRemove(index);
                  }}
                >
                  x
                </button>
                <div className="quantity-actions">
                  <button
                    className="add-quantity"
                    onClick={() => {
                      handleAddQuantity(index);
                    }}
                  >
                    +
                  </button>
                  <button
                    className="subtract-quantity"
                    onClick={() => {
                      handleSubtractQuantity(index);
                    }}
                  >
                    -
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default App;

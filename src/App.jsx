import { useState } from "react";
import "./App.css";
import products from "./data/products";
function App() {
  const [productData, setProductData] = useState([...products]);
  const [showCart, setShowCart] = useState([]);

  function newShowCart(index) {
    const newProduct = [...productData];
    newProduct[index].quantity
      ? (newProduct[index].quantity += 1)
      : (newProduct[index].quantity = 1);
    showCart.includes(newProduct[index])
      ? setShowCart([...showCart])
      : setShowCart([...showCart, newProduct[index]]);
  }
  function addQuantity(index) {
    const newProduct = [...showCart];
    newProduct[index].quantity += 1;
    setShowCart([...newProduct]);
  }
  function subTractQuantity(index) {
    const newProduct = [...showCart];
    if (newProduct[index].quantity === 1) {
      newProduct[index].quantity = 0;
      newProduct.splice(index, 1);
    } else {
      newProduct[index].quantity -= 1;
    }

    setShowCart([...newProduct]);
  }
  function deleteCart(index) {
    const newProduct = [...showCart];
    newProduct[index].quantity = 0;
    newProduct.splice(index, 1);

    setShowCart(newProduct);
  }

  return (
    <div className="App">
      <section className="product-container">
        <h1 className="product-heading">Products</h1>
        <div className="product-list">
          {productData.map((item, index) => (
            <div key={index} className="product">
              <img src={item.image} alt={item.name} />
              <h2>{item.name}</h2>
              <p>{item.description}</p>
              <button
                onClick={() => {
                  newShowCart(index);
                }}
              >
                Add to cart
              </button>
            </div>
          ))}
        </div>
      </section>
      <hr />

      <section className="cart">
        <h1 className="cart-heading">
          Cart (Total Price is{" "}
          {/* {showCart
            .map((item) => {
              return item.price * item.quantity;
            })
            .reduce((acc, cur) => {
              return acc + cur;
            }, 0)}{" "} */}
          {showCart.reduce((acc, curr) => {
            return (acc += curr.price * curr.quantity);
          }, 0)}
          {" "}Baht)
        </h1>
        <div className="cart-item-list">
          {showCart.map((item, index) => (
            <div key={index} className="cart-item">
              <h1>Item name: {item.name}</h1>
              <h2>Price: {item.price}</h2>
              <h2>Quantity: {item.quantity}</h2>
              <button
                className="delete-button"
                onClick={() => {
                  deleteCart(index);
                }}
              >
                x
              </button>
              <div className="quantity-actions">
                <button
                  className="add-quantity"
                  onClick={() => {
                    addQuantity(index);
                  }}
                >
                  +
                </button>
                <button
                  className="subtract-quantity"
                  onClick={() => {
                    subTractQuantity(index);
                  }}
                >
                  -
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;

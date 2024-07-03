import { useEffect, useState } from 'react';
import './style.css';

function App(){

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  

  useEffect(()=>{
    fetch("http://localhost:5173/products.json")
    .then((response)=>response.json())
    .then((result)=>{
      if (result && result.data.length > 0) {
        setProducts(result.data);
      }
    })
       
}, [])

function handleAddToCart(product){
  let cartAddCoppy = [...cart]
  cartAddCoppy.push(product)
  setCart(cartAddCoppy)
}

function handleRemoveFromCart(product){
  let cartRemoveCoppy = [...cart]
  cartRemoveCoppy = cartRemoveCoppy.filter((item)=>item.id != product.id)
  setCart(cartRemoveCoppy)
}

function isAddedToCart(product){
  return cart.some((item) => item.id === product.id);
}

  return  <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
              <div className="container-fluid">
                <a className="navbar-brand" href="#">Fasion Frenzy</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                      <a className="nav-link active" aria-current="page" href="#">Home</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">About</a>
                    </li>
                    <li className="nav-item dropdown">
                      <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Shop
                      </a>
                      <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#">Mens wear</a></li>
                        <li><a className="dropdown-item" href="#">Womens wear</a></li>
                      </ul>
                    </li>
                  </ul>
                    <button className="btn btn-outline-success" type="submit">cart<span>{cart.length}</span></button>
                </div>
              </div>
            </nav>
            <div className="name-board">
                <h1>FASHION FRENZY</h1>
                <p>Choose style, not just clothes</p>
            </div>
            <div className="container">
              <div className="row">
                {products.map((product, index)=>(
                  <div className="col-md-3" key={`${product.id}-${index.id}`}>
                      <div className="card">
                        <img src={product.image} className="card-img-top"/>
                        <div className="card-body">
                          <h5 className="card-title">{product.name}</h5>
                          <p className="card-text">{"$" + product.actualCost+ ".00"}</p>
                          <p className="card-text">{product.category}</p>
                          <p className="card-text">{product.subCategory}</p>
                        </div>
                          <div className="btn">
                          {isAddedToCart(product) ? (
                            <button className="btn btn-primary" onClick={() => handleRemoveFromCart(product)}>
                              Remove from Cart
                            </button>
                              ) : (
                                <button className="btn btn-primary" onClick={() => handleAddToCart(product)}>
                                  Add to Cart
                                </button>
                              )}
                          </div> 
                      </div>
                  </div>
            ))}
              </div>
            </div>
          </div>
}

export default App;
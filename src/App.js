import Header from './components/Header';
import Main from './components/Main';
import Basket from './components/Basket';
import axios from 'axios';
import { useState , useEffect} from 'react';

const cartFromLocalStorage = JSON.parse(localStorage.getItem('cartItems') || '[]')
function App() {
  const [products,setProducts] = useState([])
  const [cartItems, setCartItems] = useState(cartFromLocalStorage);

  useEffect(() =>{
    fetchProducts()
    // eslint-disable-next-line no-unused-expressions
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
  },[cartItems])

  const fetchProducts = () =>{
    axios.get('https://dnc0cmt2n557n.cloudfront.net/products.json')
    .then(res => setProducts(res.data.products))
    .catch(err => console.log(err))
  }
  const onAdd = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };
  const onRemove = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist.qty === 1) {
      setCartItems(cartItems.filter((x) => x.id !== product.id));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
    }
  };
  return (
       <div className='App'>
           <Header countCartItems={cartItems.length}></Header>
            <div className="row">
              <Main products={products} onAdd={onAdd}></Main>
              <Basket
                cartItems={cartItems}
                onAdd={onAdd}
                onRemove={onRemove}
              ></Basket>
            </div>
       </div>
       
  );
}

export default App;

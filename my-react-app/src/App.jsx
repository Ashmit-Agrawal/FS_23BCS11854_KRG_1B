import React, { useState, useEffect } from 'react';
import './index.css';
import ToDoApp from './To_do_App.jsx';
import ProductCard from './ProductCard.jsx';
function App() {
  const [showToDoApp, setShowToDoApp] = useState(true);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    console.log('App mounted');
  }, []);

  return (
    <div className="min-h-screen">
      {showToDoApp ? (
        <ToDoApp />
      ) : (
        <div className="min-h justify-center">
          <div className="text-center">
            <h1 className="text-4xl mb-4">Welcome!</h1>
            <p className="text-600 mb-6">Click to access your To-Do App</p>
          </div>
        </div>
      )}
      
      <button 
        onClick={() => setShowToDoApp(!showToDoApp)}
        className="top-6 left-6 px-6 py-3 rounded-full shadow bg-blue-600"
      >
        {showToDoApp ? 'Home' : 'To-Do App'}
      </button>


      <div className="max-w-2xl mt-30">
        <h2 className="text-2xl font-bold mb-4">Product Store</h2>
        <input type="text" placeholder='Name'/>
        <input type="text" placeholder='Description'/>
        <input type="number" placeholder='Price'/>
        <input type="checkbox" placeholder='In Stock'/>
        <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded">
          Add Product
        </button>
        <div className="grid lg:grid-cols-5 gap-6">
        <button>
          <ProductCard product={{ name: "Sample Product", description: "This is a sample product.", price: 19.99, inStock: true }} />
        </button>
        <button>
          <ProductCard product={{ name: "Sample Product", description: "This is a sample product.", price: 19.99, inStock: false }} />
        </button>
        <button>
          <ProductCard product={{ name: "Sample Product", description: "This is a sample product.", price: 19.99, inStock: false }} />
        </button>
        
      </div>
      </div>
    </div>




  
  );
}
export default App;



"use client";

import React, { useState, useMemo } from 'react';
import { ShoppingCart, Star, Heart, Zap, Tag } from 'lucide-react';
// import { products, categories, Product, Category } from './';
import {  Category,products,categories ,Product} from './products-data';
import { useCart } from '@/store/CartContext';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onWishlistToggle: (productId: string) => void;
}

const ProductsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category['name']>('All');
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'All') {
      return products;
    }
    return products.filter(product => product.category === selectedCategory);
  }, [selectedCategory]);

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const newWishlist = new Set(prev);
      if (newWishlist.has(productId)) {
        newWishlist.delete(productId);
      } else {
        newWishlist.add(productId);
      }
      return newWishlist;
    });
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Explore Our Products
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Find the latest in tech and home appliances. Quality guaranteed, prices unmatched.
          </p>
        </header>
        
        <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 text-center sm:text-left">
                Shop by Category
            </h2>
            <div className="flex overflow-x-auto space-x-4 pb-4 -mx-4 px-4 sm:grid sm:grid-cols-4 md:grid-cols-8 sm:gap-4 sm:space-x-0 sm:px-0 sm:-mx-0">
                {categories.map((category) => (
                    <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.name)}
                        className={`
                            flex-shrink-0 w-32 sm:w-auto p-4 rounded-2xl border-2 transition-all duration-300 group
                            ${selectedCategory === category.name 
                                ? 'bg-yellow-400 border-yellow-400 shadow-lg' 
                                : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-yellow-400 hover:shadow-md'
                            }
                        `}
                    >
                        <div className="relative w-full h-20 mb-3">
                            <img src={category.image} alt={category.name} className="w-full h-full object-cover rounded-lg" />
                        </div>
                        <div className="flex items-center justify-center space-x-2">
                             <category.icon className={`w-5 h-5 transition-colors ${selectedCategory === category.name ? 'text-gray-900' : 'text-yellow-500'}`} />
                            <span className={`font-bold text-sm ${selectedCategory === category.name ? 'text-gray-900' : 'text-gray-700 dark:text-gray-200'}`}>{category.name}</span>
                        </div>
                    </button>
                ))}
            </div>
        </div>

        <main>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} onWishlistToggle={toggleWishlist} isWishlisted={wishlist.has(product.id)} />
            ))}
          </div>
           {filteredProducts.length === 0 && (
            <div className="col-span-full text-center py-12">
                <p className="text-xl text-gray-500 dark:text-gray-400">No products found in this category.</p>
            </div>
           )}
        </main>
      </div>
    </div>
  );
};

const ProductCard = ({ product, isWishlisted, onWishlistToggle }: ProductCardProps) => {
  const { addToCart } = useCart();
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group flex flex-col overflow-hidden">
      <div className="relative">
        <div className="absolute top-4 left-4 z-10">
          {product.badge && <span className="bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"><Zap className="w-3 h-3"/>{product.badge}</span>}
        </div>
        <button
          onClick={() => onWishlistToggle(product.id)}
          className={`absolute top-4 right-4 z-10 p-2 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 ${
            isWishlisted ? 'bg-red-500 text-white' : 'bg-white/70 backdrop-blur-sm text-gray-700 hover:bg-red-500 hover:text-white'
          }`}
        >
          <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>
        <img src={product.image} alt={product.name} className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110" />
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex-grow">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{product.brand}</p>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-yellow-500 transition-colors line-clamp-2 mb-2 h-14">
                {product.name}
            </h3>
            <div className="flex items-center gap-2 mb-4">
                <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => <Star key={i} className={`w-4 h-4 ${i < Math.round(product.rating) ? 'fill-current' : 'text-gray-300 dark:text-gray-600'}`} />)}
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-300">{product.rating} ({product.reviews} reviews)</span>
            </div>
        </div>
        <div className="mb-4">
            <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-gray-900 dark:text-white">{product.displayPrice}</span>
                {product.originalPrice && <span className="text-lg text-gray-400 line-through">{product.originalPrice}</span>}
            </div>
            {product.discountText && <div className="mt-1 text-sm font-semibold text-red-500 flex items-center gap-1"><Tag className="w-3 h-3"/>{product.discountText}</div>}
        </div>
        <button 
            onClick={() => addToCart(product)}
            className="w-full bg-gray-900 dark:bg-yellow-400 hover:bg-yellow-500 dark:hover:bg-yellow-500 dark:text-gray-900 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 group/btn mt-auto">
            <ShoppingCart className="w-5 h-5" />
            <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
};

export default ProductsPage;
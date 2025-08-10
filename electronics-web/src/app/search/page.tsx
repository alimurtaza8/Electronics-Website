"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { products } from '../products/products-data';
import { Product } from '../products/products-data';
import { ShoppingCart, Star, Heart, Zap, Tag, Search as SearchIcon } from 'lucide-react';
import { useCart } from '@/store/CartContext';
import Link from 'next/link';

const SearchResultsContent = () => {
    const searchParams = useSearchParams();
    const query = searchParams.get('q');
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [wishlist, setWishlist] = useState<Set<string>>(new Set());
    const { addToCart } = useCart();

    useEffect(() => {
        if (query) {
            const lowercasedQuery = query.toLowerCase();
            const results = products.filter(product =>
                product.name.toLowerCase().includes(lowercasedQuery) ||
                product.brand.toLowerCase().includes(lowercasedQuery) ||
                product.category.toLowerCase().includes(lowercasedQuery)
            );
            setFilteredProducts(results);
        } else {
            setFilteredProducts([]);
        }
    }, [query]);

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
        <div className="bg-gray-50 min-h-screen">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <header className="text-center mb-12">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
                        Search Results
                    </h1>
                    {query && (
                        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                            Showing results for: <span className="font-bold text-yellow-600">{query}</span>
                        </p>
                    )}
                </header>

                <main>
                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {filteredProducts.map((product) => (
                                <ProductCard 
                                    key={product.id} 
                                    product={product} 
                                    onWishlistToggle={toggleWishlist} 
                                    isWishlisted={wishlist.has(product.id)}
                                    addToCart={() => addToCart(product)}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-white rounded-lg shadow-md">
                            <SearchIcon className="mx-auto h-16 w-16 text-gray-400" />
                            <h2 className="mt-6 text-2xl font-semibold text-gray-800">No products found</h2>
                            <p className="mt-2 text-gray-500">
                                Sorry, we couldn&apos;t find any products matching your search.
                            </p>
                            <Link href="/" className="mt-6 inline-block bg-yellow-500 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-yellow-600 transition-all">
                                Continue Shopping
                            </Link>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

interface ProductCardProps {
    product: Product;
    isWishlisted: boolean;
    onWishlistToggle: (id: string) => void;
    addToCart: () => void;
}

const ProductCard = ({ product, isWishlisted, onWishlistToggle, addToCart }: ProductCardProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group flex flex-col overflow-hidden">
        <div className="relative">
            {product.badge && (
                <div className="absolute top-4 left-4 z-10">
                    <span className="bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                        <Zap className="w-3 h-3"/>
                        {product.badge}
                    </span>
                </div>
            )}
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
                <p className="text-sm text-gray-500 mb-1">{product.brand}</p>
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-yellow-500 transition-colors line-clamp-2 mb-2 h-14">
                    {product.name}
                </h3>
                <div className="flex items-center gap-2 mb-4">
                    <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => <Star key={i} className={`w-4 h-4 ${i < Math.round(product.rating) ? 'fill-current' : 'text-gray-300'}`} />)}
                    </div>
                    <span className="text-sm text-gray-600">{product.rating} ({product.reviews} reviews)</span>
                </div>
            </div>

            <div className="mb-4">
                <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-gray-900">{product.displayPrice}</span>
                    {product.originalPrice && <span className="text-lg text-gray-400 line-through">{product.originalPrice}</span>}
                </div>
                {product.discountText && <div className="mt-1 text-sm font-semibold text-red-500 flex items-center gap-1"><Tag className="w-3 h-3"/>{product.discountText}</div>}
            </div>
            
            <button onClick={addToCart} className="w-full bg-gray-900 hover:bg-yellow-500 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 group/btn mt-auto">
                <ShoppingCart className="w-5 h-5" />
                <span>Add to Cart</span>
            </button>
        </div>
    </div>
  );
};

const SearchPage = () => (
    <Suspense fallback={<div>Loading...</div>}>
        <SearchResultsContent />
    </Suspense>
);

export default SearchPage;


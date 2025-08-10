// app/products/data-handler.ts

import { Smartphone, Laptop, Tablet, Home, Waves, Wind, Zap, Power } from 'lucide-react';

// --- THE DEFINITIVE RAW PRODUCT DATA (USD ONLY) ---
// This list is curated directly from your provided details.
const RAW_PRODUCTS = [
  // iPhones from Table (USD Prices)
  { id: 'ip11p', category: 'iPhones', name: 'iPhone 11 Pro', originalUSD: '$790', discountedUSD: '$650' ,image: '/images/p_1.jpg'},
  { id: 'ip11pm', category: 'iPhones', name: 'iPhone 11 Pro Max', originalUSD: '$860', discountedUSD: '$710' ,image: '/images/p_1.jpg'},
  { id: 'ip12', category: 'iPhones', name: 'iPhone 12', originalUSD: '$740', discountedUSD: '$620',image: '/images/p_1.jpg' },
  { id: 'ip12p', category: 'iPhones', name: 'iPhone 12 Pro', originalUSD: '$830', discountedUSD: '$680' ,image: '/images/p_1.jpg'},
  { id: 'ip12pm', category: 'iPhones', name: 'iPhone 12 Pro Max', originalUSD: '$900', discountedUSD: '$750' ,image: '/images/p_2.jpg'},
  { id: 'ip13p', category: 'iPhones', name: 'iPhone 13 Pro', originalUSD: '$900', discountedUSD: '$760' ,image: '/images/p_3.jpg'},
  { id: 'ip13pm', category: 'iPhones', name: 'iPhone 13 Pro Max', originalUSD: '$970', discountedUSD: '$810' ,image: '/images/p_4.jpg'},
  { id: 'ip14', category: 'iPhones', name: 'iPhone 14', originalUSD: '$890', discountedUSD: '$760' ,image: '/images/p_5.jpg'},
  { id: 'ip14p', category: 'iPhones', name: 'iPhone 14 Pro', originalUSD: '$1,080', discountedUSD: '$920' ,image: '/images/p_6.jpg'},
  { id: 'ip14pm', category: 'iPhones', name: 'iPhone 14 Pro Max', originalUSD: '$1,170', discountedUSD: '$990',image: '/images/p_7.jpg' },
  // iPhones from 30% Off List
  { id: 'ip16e', category: 'iPhones', name: 'iPhone 16e', originalUSD: '$599', discountedUSD: '$419', badge: 'New Model' ,image: '/images/p_8.jpg'},
  { id: 'ip16p', category: 'iPhones', name: 'iPhone 16 Pro', originalUSD: '$1,099', discountedUSD: '$769' ,image: '/images/p_8.jpg'},
  { id: 'ip16pm', category: 'iPhones', name: 'iPhone 16 Pro Max', originalUSD: '$1,199', discountedUSD: '$839' ,image: '/images/p_9.jpg'},
  
  // Chargers from 30% Off List
  { id: 'chg20', category: 'Chargers', name: '20W USB-C Power Adapter', originalUSD: '$19', discountedUSD: '$13' ,image: '/images/20w-c.webp'},
  { id: 'chg30', category: 'Chargers', name: '30W USB-C Power Adapter', originalUSD: '$39', discountedUSD: '$27' ,image: '/images/MY1W2_GEO_SG.jpg'},
  { id: 'chg35', category: 'Chargers', name: '35W Dual USB-C Adapter', originalUSD: '$59', discountedUSD: '$41' ,image: '/images/MNWM3.webp'},
  { id: 'chgms1', category: 'Chargers', name: 'MagSafe Charger (1m)', originalUSD: '$39', discountedUSD: '$27',image: '/images/mx6x3_av2.jpg' },

  // iPads from 30% Off List
  { id: 'ipad10', category: 'iPads', name: 'iPad (10th Gen, 2025)', originalUSD: '$449', discountedUSD: '$314', badge: 'Pre-Order',image: '/images/apple.webp' },
  { id: 'ipadairm3', category: 'iPads', name: 'iPad Air (M3)', originalUSD: '$599', discountedUSD: '$419' ,image: '/images/ipad.png'},
  { id: 'ipadprom413', category: 'iPads', name: 'iPad Pro (M4, 13")', originalUSD: '$1,299', discountedUSD: '$909', image: '/images/iphone_m4.jpg' },

  // MacBooks from 30% Off List
  { id: 'mba13', category: 'MacBooks', name: 'MacBook Air (M4, 13")', originalUSD: '$999', discountedUSD: '$699', badge: 'Top Rated',image: '/images/macbook-air-13.webp' },
  { id: 'mba15', category: 'MacBooks', name: 'MacBook Air (M4, 15")', originalUSD: '$1,199', discountedUSD: '$839',image: '/images/i_1.jpg' },
  { id: 'mbp14', category: 'MacBooks', name: 'MacBook Pro (M4, 14")', originalUSD: '$1,999', discountedUSD: '$1,399', image: '/images/macbook-air-1.webp' },
  { id: 'mbp16', category: 'MacBooks', name: 'MacBook Pro (M4, 16")', originalUSD: '$2,499', discountedUSD: '$1,749',image: '/images/m4-macbook-air-13-06.webp' },
  
  // Home & Kitchen with Price Ranges
  { id: 'wm_samsung', category: 'Washing Machines', name: 'Samsung Smart AI Washer', priceText: '$800 - $1,200',image: '/images/sam.jpg' },
  { id: 'wm_lg', category: 'Washing Machines', name: 'LG Budget Front-Loader', priceText: '$500 - $700' ,image: '/images/w.jpg' },
  { id: 'mw_breville', category: 'Microwaves', name: 'Breville Combi Wave 3-in-1', priceText: '$350 - $450',image: '/images/micro.webp'},
  { id: 'af_ninja', category: 'Air Fryers', name: 'Ninja Foodi DualZone (10 Qt)', priceText: '$180 - $200', badge: 'Best Seller', image: '/images/ninja.jpg' },
  { id: 'af_philips', category: 'Air Fryers', name: 'Philips Premium XXL (7 Qt)', priceText: '$229' , image: '/images/n_p.jpg' },
];


interface RawProduct {
  id: string;
  category: string;
  name: string;
  originalUSD?: string;
  discountedUSD?: string;
  priceText?: string;
  badge?: string;
  // image?: string;
  image: string | undefined;
  // Add other properties as needed
}

// --- UNIFIED TYPE DEFINITIONS ---
export interface Product {
  id: string;
  name: string;
  category: string;
  brand: string;
  image: string;
  rating: number;
  reviews: number;
  badge?: string;
  displayPrice: string;
  originalPrice?: string;
  discountText?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  image: string;
}

// --- UPDATED CATEGORY LIST ---
export const categories: Category[] = [
  { id: 'cat-all', name: 'All', icon: Zap, image: '/images/i_6.jpg' },
  { id: 'cat-iphones', name: 'iPhones', icon: Smartphone, image: '/images/iphone_16.jpg' },
  { id: 'cat-macbooks', name: 'MacBooks', icon: Laptop, image: '/images/mac.jpg' },
  { id: 'cat-ipads', name: 'iPads', icon: Tablet, image: '/images/iphone_m4.jpg' },
  { id: 'cat-chargers', name: 'Chargers', icon: Power, image: '/images/i_7.jpg' },
  { id: 'cat-washers', name: 'Washing Machines', icon: Home, image: '/images/washer.jpg' },
  { id: 'cat-microwaves', name: 'Microwaves', icon: Waves, image: '/images/micro.webp' },
  { id: 'cat-airfryers', name: 'Air Fryers', icon: Wind, image: '/images/air_fyer.webp' },
];

// --- UPDATED NORMALIZATION FUNCTION (USD ONLY) ---
function normalizeProductData(rawProduct: RawProduct): Product {
    let displayPrice = "Contact for Price";
    let originalPrice: string | undefined = undefined;
    let discountText: string | undefined = undefined;

    if (rawProduct.discountedUSD) {
        displayPrice = rawProduct.discountedUSD;
        originalPrice = rawProduct.originalUSD;
        // Calculate discount percentage from the USD strings
        // const origNum = parseFloat(originalPrice.replace(/[$,]/g, ''));
        // const origNum = parseFloat(originalPrice?.replace(/[$,]/g, ''));

        if (originalPrice) {
    const origNum = parseFloat(originalPrice.replace(/[$,]/g, ''));
    const discNum = parseFloat(displayPrice.replace(/[$,]/g, ''));
    if (!isNaN(origNum) && !isNaN(discNum) && origNum > 0) {
        const percentage = Math.round(((origNum - discNum) / origNum) * 100);
        discountText = `${percentage}% OFF`;
    }
   
    
}

        // const discNum = parseFloat(displayPrice.replace(/[$,]/g, ''));
        // if (!isNaN(origNum) && !isNaN(discNum) && origNum > 0) {
        //     const percentage = Math.round(((origNum - discNum) / origNum) * 100);
        //     discountText = `${percentage}% OFF`;
        // }
    } else if (rawProduct.originalUSD) {
        displayPrice = rawProduct.originalUSD;
    } else if (rawProduct.priceText) {
        displayPrice = rawProduct.priceText;
    }

    const nameLower = rawProduct.name.toLowerCase();
    let brand = "Premium Tech";
    if (nameLower.includes("iphone") || nameLower.includes("macbook") || nameLower.includes("ipad") || nameLower.includes("magsafe")) brand = "Apple";
    else if (nameLower.includes("samsung")) brand = "Samsung";
    else if (nameLower.includes("lg")) brand = "LG";
    else if (nameLower.includes("ninja")) brand = "Ninja";
    else if (nameLower.includes("philips")) brand = "Philips";
    else if (nameLower.includes("breville")) brand = "Breville";

    return {
        id: rawProduct.id.toString(),
        name: rawProduct.name,
        category: rawProduct.category,
        badge: rawProduct.badge,
        brand: brand,
        // image: `https://source.unsplash.com/600x600/?${rawProduct.name.split('(')[0].trim()}`,
        // image: rawProduct.image,
        // image: rawProduct.image!,
        image: rawProduct.image as string,
        rating: 4.7, 
        reviews: 1337,
        displayPrice,
        originalPrice,
        discountText,
    };
}

export const products: Product[] = RAW_PRODUCTS.map(normalizeProductData);
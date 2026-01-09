'use client';

import Link from 'next/link';
import { Menu, X, Search, User, Home, Building2, Key, DollarSign, Users2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: '/buy', label: 'Buy', icon: Home },
    { href: '/rent', label: 'Rent', icon: Key },
    { href: '/commercial', label: 'Commercial', icon: Building2 },
    { href: '/sell', label: 'Sell', icon: DollarSign },
    { href: '/agents', label: 'Agents', icon: Users2 },
  ];

  return (
    <nav className="fixed z-50 top-4 left-0 right-0 mx-auto max-w-7xl bg-white/80 backdrop-blur-md shadow-md rounded-full border border-white/20">
      <div className="px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
            <Link href="/" className="flex items-center group">
              <span className="text-2xl font-serif font-bold text-blue-950">
                Webb Heads
              </span>
            </Link>

            <div className="hidden md:flex space-x-1 items-center">
              {navItems.map((item) => (
                <Link 
                  key={item.href}
                  href={item.href} 
                  className="group flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-blue-950 transition-all duration-300 font-medium rounded-lg hover:bg-gray-100"
                >
                  <item.icon size={18} className="text-gray-500 group-hover:text-amber-500 transition-colors" />
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="hidden md:flex items-center space-x-3">
              <button className="text-gray-600 hover:text-blue-950 hover:bg-gray-100 p-2 rounded-lg transition-all duration-300">
                <Search size={20} />
              </button>
              <Link href="#" className="text-gray-600 hover:text-blue-950 hover:bg-gray-100 p-2 rounded-lg transition-all duration-300">
                <User size={20} />
              </Link>
              <Button className="bg-amber-500 hover:bg-amber-600 text-blue-950 font-bold">
                List Property
              </Button>
            </div>

            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-600 hover:text-blue-950 p-2"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link 
                key={item.href}
                href={item.href} 
                className="flex items-center gap-3 px-4 py-3 text-base font-medium text-gray-700 hover:text-blue-950 hover:bg-gray-100 rounded-lg transition-all duration-300"
                onClick={() => setIsOpen(false)}
              >
                <item.icon size={20} className="text-gray-500" />
                {item.label}
              </Link>
            ))}
            <div className="pt-4 flex flex-col gap-2 px-3">
              <Button className="w-full bg-blue-950 hover:bg-blue-900 text-white">Sign In</Button>
              <Button className="w-full bg-amber-500 hover:bg-amber-600 text-blue-950 font-bold">List Property</Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

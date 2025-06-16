import { Menu, Search, X } from 'lucide-react';
import React, { useContext, useState, useRef } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { ThemeContext } from '../context/ThemeContext';
import { Link } from 'react-router-dom';
import axios from 'axios';

const links = ["Business", "Entertainment", "General", "Health", "Science", "Sports", "Technology"];

const Navbar = ({ setArticles }) => {
    const { theme, setTheme } = useContext(ThemeContext);
    const [open, setOpen] = useState(false);
    const typingTimeout = useRef(null);

    const handleSearch = (e) => {
        const search = e.target.value;

        if (typingTimeout.current) {
            clearTimeout(typingTimeout.current);
        }

        typingTimeout.current = setTimeout(async () => {
            if (!search.trim()) return;
            try {
                const res = await axios.get(`https://newsapi.org/v2/everything?q=${search}&apiKey=${import.meta.env.VITE_API_KEY}`);
                setArticles(res.data.articles);
            } catch (error) {
                console.error("Search failed:", error);
            }
        }, 500);
    };

    const toggleTheme = () => {
        if (theme === 'light') {
            setTheme('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            setTheme('light');
            localStorage.setItem('theme', 'light');
        }
    };

    return (
        <div className='fixed w-full bg-gradient-to-r from-white via-slate-50 to-white dark:from-blue-900 dark:via-slate-900 dark:to-blue-900 z-10 shadow-lg border-b border-slate-200/50 dark:border-slate-700/50 backdrop-blur-sm'>
            <div className='max-w-7xl mx-auto px-6 py-4 flex items-center justify-between'>
                {/* Logo */}
                <Link to={'/'}>
                    <div className='md:text-3xl text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 dark:from-cyan-400 dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent cursor-pointer hover:scale-105 transition-transform duration-300'>
                        NewsApp
                    </div>
                </Link>

                {/* Desktop Links */}
                <div className='hidden md:flex space-x-8 flex-1 justify-center'>
                    {
                        links.map((link) => (
                            <Link
                                to={`/${link.toLowerCase()}`}
                                key={link}
                                className='relative text-gray-700 dark:text-gray-200 dark:hover:text-cyan-400 hover:text-blue-600 transition-all duration-300 font-medium text-sm uppercase tracking-wide group'
                            >
                                {link}
                                <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-cyan-400 dark:to-blue-400 group-hover:w-full transition-all duration-300'></span>
                            </Link>
                        ))
                    }
                </div>

                <div className='flex items-center justify-center gap-4'>
                    {/* Search */}
                    <div className='relative group'>
                        <div className='absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                        <div className='relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-3 rounded-xl border border-slate-200 dark:border-slate-600 shadow-sm hover:shadow-md transition-all duration-300'>
                            <Search className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-4 w-4' />
                            <input
                                onChange={handleSearch}
                                type="text"
                                placeholder='Search news...'
                                className='md:pl-11 pl-10 pr-4 md:w-64 w-32 outline-none focus:outline-none bg-transparent text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 text-sm'
                            />
                        </div>
                    </div>

                    {/* Theme toggle */}
                    <button 
                        onClick={toggleTheme} 
                        className='relative p-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-600 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 group overflow-hidden'
                    >
                        <div className='absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 dark:from-blue-400/20 dark:to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                        <div className='relative z-10 text-gray-600 dark:text-gray-300 group-hover:text-yellow-600 dark:group-hover:text-blue-400 transition-colors duration-300'>
                            {theme === 'light' ? <FaMoon size={16} /> : <FaSun size={16} />}
                        </div>
                    </button>

                    {/* Mobile menu toggle */}
                    <button 
                        onClick={() => setOpen(!open)} 
                        className='md:hidden p-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-600 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 group'
                    >
                        <div className='text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors duration-300'>
                            {open ? <X size={20} /> : <Menu size={20} />}
                        </div>
                    </button>
                </div>
            </div>

            {/* Mobile Links */}
            {
                open && (
                    <div className='md:hidden px-6 pb-4 border-t border-slate-200/50 dark:border-slate-700/50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm'>
                        <div className='grid grid-cols-2 gap-2 pt-4'>
                            {
                                links.map((link) => (
                                    <Link
                                        key={link}
                                        to={`/${link.toLowerCase()}`}
                                        onClick={() => setOpen(false)}
                                        className='block py-3 px-4 text-center text-gray-700 dark:text-gray-200 dark:hover:text-cyan-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800/50 rounded-lg transition-all duration-300 font-medium text-sm'
                                    >
                                        {link}
                                    </Link>
                                ))
                            }
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default Navbar;
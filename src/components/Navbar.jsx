import { Menu, Search, X } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

// Mock implementations for demo
const Link = ({ to, children, ...props }) => <a href={to} {...props}>{children}</a>;

const links = ["Business", "Entertainment", "General", "Health", "Science", "Sports", "Technology"];

const Navbar = ({ setArticles = () => {} }) => {
    const [theme, setTheme] = useState('dark');
    const [open, setOpen] = useState(false);
    const [activeLink, setActiveLink] = useState("");
    const [searchFocused, setSearchFocused] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [particles, setParticles] = useState([]);
    const typingTimeout = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const newParticles = Array.from({ length: 15 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 3 + 1,
            speed: Math.random() * 0.5 + 0.1,
        }));
        setParticles(newParticles);
    }, []);

    const handleSearch = async (e) => {
        const search = e.target.value;

        if (typingTimeout.current) {
            clearTimeout(typingTimeout.current);
        }

        typingTimeout.current = setTimeout(async () => {
            if (!search.trim()) return;
            try {
                const response = await fetch(`https://newsapi.org/v2/everything?q=${search}&apiKey=${import.meta.env.VITE_API_KEY}`);
                const data = await response.json();
                setArticles(data.articles || []);
            } catch (error) {
                console.error("Search failed:", error);
            }
        }, 500);
    };

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };

    return (
        <nav className={`
            fixed w-full z-50 transition-all duration-500 ease-out
            ${isScrolled 
                ? 'bg-black/95 backdrop-blur-xl shadow-2xl shadow-cyan-500/20' 
                : 'bg-gradient-to-br from-black/95 via-purple-950/95 to-blue-950/95 backdrop-blur-lg'
            }
            border-b border-purple-500/30
        `}>
            {/* Animated particle background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {particles.map((particle) => (
                    <div
                        key={particle.id}
                        className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-30 animate-pulse"
                        style={{
                            left: `${particle.x}%`,
                            top: `${particle.y}%`,
                            transform: `scale(${particle.size})`,
                            animationDelay: `${particle.id * 0.3}s`,
                            animationDuration: `${2 + particle.speed * 3}s`
                        }}
                    />
                ))}
            </div>

            {/* Dynamic grid overlay */}
            <div className="absolute inset-0 opacity-5">
                <div className="h-full w-full" style={{
                    backgroundImage: `
                        linear-gradient(rgba(0,255,255,0.3) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(0,255,255,0.3) 1px, transparent 1px)
                    `,
                    backgroundSize: '30px 30px',
                    transform: isScrolled ? 'scale(1.1)' : 'scale(1)',
                    transition: 'transform 0.5s ease'
                }}></div>
            </div>
            
            {/* Animated border effect */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse"></div>
            
            {/* Main container */}
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex items-center justify-between relative z-10">
                    {/* Logo - Left aligned */}
                    <div className="flex-shrink-0">
                        <Link to={'/'}>
                            <div className='text-2xl lg:text-3xl font-black bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent cursor-pointer hover:scale-110 transform transition-all duration-300 relative group'>
                                <span className="relative inline-block">
                                    NewsApp
                                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent  group-hover:opacity-70  duration-300">
                                        NewsApp
                                    </div>
                                    <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                                </span>
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Navigation - Centered */}
                    <div className="hidden lg:flex items-center justify-center flex-1">
                        <div className="flex space-x-6">
                            {links.map((link) => (
                                <Link
                                    to={`/${link.toLowerCase()}`}
                                    key={link}
                                    onMouseEnter={() => setActiveLink(link)}
                                    onMouseLeave={() => setActiveLink("")}
                                    className="group relative px-4 py-2 rounded-xl overflow-hidden transition-all duration-300 transform hover:scale-105"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-cyan-500/20 group-hover:via-purple-500/20 group-hover:to-pink-500/20 transition-all duration-500 rounded-xl"></div>
                                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-cyan-400/50 rounded-xl transition-all duration-300"></div>
                                    <span className={`
                                        relative text-base font-semibold tracking-wide transition-all duration-300
                                        ${activeLink === link 
                                            ? 'text-white' 
                                            : 'text-cyan-200 group-hover:text-white'
                                        }
                                    `} style={{
                                        textShadow: activeLink === link 
                                            ? '0 0 10px rgba(0,255,255,0.8)' 
                                            : '0 0 5px rgba(0,255,255,0.5)'
                                    }}>
                                        {link}
                                    </span>
                                    <div className="absolute bottom-0 left-0 right-0 h-px overflow-hidden">
                                        <div className={`h-full bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 transform origin-left transition-transform duration-500 ${activeLink === link ? 'scale-x-100' : 'scale-x-0'}`}></div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Right side actions */}
                    <div className="flex items-center gap-4">
                        {/* Search Component */}
                        <div className={`
                            relative group transition-all duration-500 ease-out
                            ${searchFocused ? 'scale-105' : 'scale-100'}
                        `}>
                            <div className={`
                                relative bg-black/40 backdrop-blur-xl border-2 rounded-2xl transition-all duration-500 p-3
                                ${searchFocused 
                                    ? 'border-cyan-400 shadow-lg shadow-cyan-500/50 bg-black/60' 
                                    : 'border-purple-500/40 group-hover:border-purple-400/60'
                                }
                            `}>
                                <div className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-cyan-400 opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2 border-cyan-400 opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="absolute bottom-1 left-1 w-3 h-3 border-b-2 border-l-2 border-cyan-400 opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-cyan-400 opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
                                
                                <Search className={`
                                    absolute left-4 top-1/2 transform -translate-y-1/2 transition-all duration-300 w-5 h-5
                                    ${searchFocused ? 'text-cyan-400 scale-110' : 'text-purple-400 group-hover:text-cyan-400'}
                                `} />
                                
                                <input
                                    onChange={handleSearch}
                                    onFocus={() => setSearchFocused(true)}
                                    onBlur={() => setSearchFocused(false)}
                                    type="text"
                                    placeholder='Search news...'
                                    className='pl-12 pr-4 w-48 xl:w-64 h-8 outline-none bg-transparent text-cyan-100 placeholder-purple-300/70 font-medium text-sm transition-all duration-300'
                                    style={{
                                        textShadow: '0 0 8px rgba(0,255,255,0.6)'
                                    }}
                                />
                                
                                {searchFocused && (
                                    <>
                                        <div className="absolute bottom-2 left-4 right-4 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse"></div>
                                        <div className="absolute top-2 left-4 right-4 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-50 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Theme Toggle */}
                        <button 
                            onClick={toggleTheme} 
                            className='relative group p-3 rounded-2xl cursor-pointer transition-all duration-500 transform hover:scale-110 active:scale-95 overflow-hidden bg-gradient-to-br from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500'
                        >
                            <div className="absolute inset-0 rounded-2xl border-2 border-cyan-400/0 group-hover:border-cyan-400/100 transition-all duration-500"></div>
                            <div className="relative text-white text-lg transition-transform duration-300 group-hover:scale-110" style={{
                                filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.8))'
                            }}>
                                {theme === 'light' ? <FaMoon /> : <FaSun />}
                            </div>
                        </button>

                        {/* Mobile Menu Toggle */}
                        <button 
                            onClick={() => setOpen(!open)} 
                            className={`
                                lg:hidden relative group p-3 rounded-2xl border-2 transition-all duration-300 transform hover:scale-110 active:scale-95 overflow-hidden
                                ${open 
                                    ? 'bg-gradient-to-br from-red-500/30 to-pink-500/30 border-red-400 text-red-200 shadow-lg shadow-red-500/30' 
                                    : 'bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border-cyan-400/60 text-cyan-200 hover:shadow-lg hover:shadow-cyan-500/30'
                                }
                            `}
                        >
                            <div className={`absolute inset-0 rounded-2xl opacity-20 animate-pulse ${open ? 'bg-red-400' : 'bg-cyan-400'}`}></div>
                            <div className="relative transition-transform duration-300 group-hover:rotate-180">
                                {open ? <X size={24} /> : <Menu size={24} />}
                            </div>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div className={`
                    lg:hidden overflow-hidden transition-all duration-500 ease-out
                    ${open ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}
                `}>
                    <div className='px-4 sm:px-6 pb-6 bg-black/50 backdrop-blur-xl border-t border-cyan-400/30'>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                            {links.map((link, index) => (
                                <Link
                                    key={link}
                                    to={`/${link.toLowerCase()}`}
                                    onClick={() => setOpen(false)}
                                    className='group relative block py-4 px-6 text-cyan-200 font-semibold rounded-2xl border border-purple-500/30 hover:border-cyan-400/80 transition-all duration-500 transform hover:scale-105 active:scale-95 overflow-hidden'
                                    style={{
                                        animationDelay: open ? `${index * 100}ms` : '0ms'
                                    }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-cyan-500/20 group-hover:via-purple-500/20 group-hover:to-pink-500/20 transition-all duration-500 rounded-2xl"></div>
                                    <div className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-cyan-400/50 group-hover:border-cyan-400 transition-colors duration-300"></div>
                                    <div className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-cyan-400/50 group-hover:border-cyan-400 transition-colors duration-300"></div>
                                    <span className="relative transition-all duration-300 group-hover:text-white" style={{ 
                                        textShadow: '0 0 10px rgba(0,255,255,0.5)' 
                                    }}>
                                        {link}
                                    </span>
                                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:animate-pulse"></div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
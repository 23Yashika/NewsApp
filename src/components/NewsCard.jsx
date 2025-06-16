import React, { useState } from 'react';

// Mock Link component for demo
const Link = ({ to, children, ...props }) => <a href={to} {...props}>{children}</a>;

const NewsCard = ({ article }) => {
    const { source, author, title, description, url, urlToImage, publishedAt } = article;
    const [imageLoaded, setImageLoaded] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div 
            className='group relative max-w-md mx-auto bg-gradient-to-br from-black/90 via-purple-950/90 to-blue-950/90 backdrop-blur-lg hover:scale-105 transition-all duration-500 rounded-2xl shadow-2xl overflow-hidden hover:shadow-cyan-500/25 border border-purple-500/30 hover:border-cyan-400/60'
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Animated particle background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(8)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-30 animate-pulse"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${i * 0.5}s`,
                            animationDuration: `${2 + Math.random() * 3}s`
                        }}
                    />
                ))}
            </div>

            {/* Holographic grid overlay */}
            <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                <div className="h-full w-full" style={{
                    backgroundImage: `
                        linear-gradient(rgba(0,255,255,0.3) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(0,255,255,0.3) 1px, transparent 1px)
                    `,
                    backgroundSize: '20px 20px'
                }}></div>
            </div>

            {/* Tech corner accents */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-cyan-400 opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-cyan-400 opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-cyan-400 opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-cyan-400 opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>

            {/* Animated border glow */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 rounded-2xl border-2 border-cyan-400/50 animate-pulse"></div>
                <div className="absolute inset-1 rounded-2xl border border-purple-400/30 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            </div>

            {/* Enhanced image container */}
            <div className="relative overflow-hidden rounded-t-2xl">
                <div className={`
                    relative w-full h-48 bg-gradient-to-br from-purple-800 to-blue-800 transition-all duration-500
                    ${imageLoaded ? 'opacity-0' : 'opacity-100'}
                `}>
                    {/* Image loading placeholder */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 border-4 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin"></div>
                    </div>
                </div>
                
                <img 
                    src={urlToImage} 
                    alt={title} 
                    className={`
                        absolute inset-0 w-full h-48 object-cover transition-all duration-700 group-hover:scale-110
                        ${imageLoaded ? 'opacity-100' : 'opacity-0'}
                    `}
                    onLoad={() => setImageLoaded(true)}
                    style={{
                        filter: isHovered ? 'brightness(1.1) contrast(1.1) saturate(1.2)' : 'brightness(0.9) contrast(1.05)'
                    }}
                />
                
                {/* Image overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>
                
                {/* Scanning line effect */}
                {isHovered && (
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse"></div>
                )}
            </div>

            {/* Enhanced content section */}
            <div className='relative p-6 space-y-4'>
                {/* Glowing title */}
                <Link to={url}>
                    <h2 className='text-xl font-bold text-transparent bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text hover:from-white hover:via-cyan-200 hover:to-purple-200 transition-all duration-300 group-hover:scale-105 transform origin-left leading-tight'>
                        {title}
                        {/* Title glow effect */}
                        <span className="absolute inset-0 blur-sm opacity-0 group-hover:opacity-50 transition-opacity duration-300 bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
                            {title}
                        </span>
                    </h2>
                </Link>

                {/* Enhanced description */}
                <div className="relative">
                    <p className='text-sm text-cyan-200/80 group-hover:text-cyan-100 transition-colors duration-300 leading-relaxed' style={{
                        textShadow: '0 0 10px rgba(0,255,255,0.3)'
                    }}>
                        {description?.length > 100 ? description.slice(0, 100) + "..." : description}
                    </p>
                    
                    {/* Subtle background glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                </div>

                {/* Enhanced metadata section */}
                <div className='flex flex-col space-y-2 pt-2 border-t border-purple-500/30 group-hover:border-cyan-400/50 transition-colors duration-300'>
                    <div className='flex justify-between items-center text-sm'>
                        <span className='text-purple-300 group-hover:text-cyan-300 transition-colors duration-300 font-medium' style={{
                            textShadow: '0 0 8px rgba(147,51,234,0.5)'
                        }}>
                            By {author || "Unknown"}
                        </span>
                        <span className='text-purple-400 group-hover:text-cyan-400 transition-colors duration-300' style={{
                            textShadow: '0 0 8px rgba(147,51,234,0.3)'
                        }}>
                            {new Date(publishedAt).toLocaleDateString()}
                        </span>
                    </div>
                    
                    {/* Enhanced source badge */}
                    <div className='flex justify-between items-center'>
                        <div className='inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 group-hover:border-cyan-400/60 transition-all duration-300'>
                            <div className="w-2 h-2 bg-cyan-400 rounded-full mr-2 animate-pulse"></div>
                            <span className='text-xs text-cyan-300 font-semibold tracking-wide' style={{
                                textShadow: '0 0 8px rgba(0,255,255,0.5)'
                            }}>
                                {source.name}
                            </span>
                        </div>
                        
                        {/* Read more indicator */}
                        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <span className="text-xs text-cyan-400 font-medium">Read</span>
                            <div className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse"></div>
                            <div className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                            <div className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                    </div>
                </div>

                {/* Holographic data streams */}
                <div className="absolute bottom-0 left-0 right-0 h-px overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                </div>
            </div>

            {/* Interactive glow effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-cyan-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 transition-all duration-700 pointer-events-none"></div>
        </div>
    );
};

export default NewsCard;
import React from 'react'
import { Link } from 'react-router-dom'

const NewsCard = ({ article }) => {
    const { source, author, title, description, url, urlToImage, publishedAt } = article
    
    return (
        <div className='max-w-md mx-auto bg-gradient-to-br from-white via-slate-50 to-white dark:from-gray-900 dark:via-slate-900 dark:to-gray-900 hover:scale-105 transition-all rounded-xl shadow-lg hover:shadow-2xl duration-500 overflow-hidden border border-slate-200/50 dark:border-slate-700/50 group backdrop-blur-sm'>
            <div className='relative overflow-hidden'>
                <img 
                    src={urlToImage} 
                    alt={title} 
                    className='w-full h-48 object-cover bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-600 group-hover:scale-110 transition-transform duration-700 filter group-hover:brightness-110' 
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                <div className='absolute top-3 right-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-gray-600 dark:text-gray-300 border border-white/50 dark:border-gray-700/50'>
                    {source.name}
                </div>
            </div>
            
            <div className='p-6 relative'>
                <div className='absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30 dark:from-blue-950/30 dark:via-transparent dark:to-purple-950/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-xl pointer-events-none'></div>
                
                <div className='relative z-10'>
                    <Link to={url}>
                        <h2 className='text-xl font-bold text-gray-800 dark:text-gray-100 hover:text-transparent hover:bg-gradient-to-r hover:from-blue-600 hover:via-purple-600 hover:to-blue-800 dark:hover:from-cyan-400 dark:hover:via-blue-400 dark:hover:to-purple-400 hover:bg-clip-text transition-all duration-300 leading-tight group-hover:scale-[1.02] transform origin-left'>
                            {title}
                        </h2>
                    </Link>
                    
                    <p className='text-sm text-gray-600 dark:text-gray-300 mt-3 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300'>
                        {description?.length > 100 ? description.slice(0, 100) + "..." : description}
                    </p>
                    
                    <div className='mt-5 flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-300'>
                        <span className='font-medium bg-gradient-to-r from-gray-600 to-gray-700 dark:from-gray-400 dark:to-gray-300 bg-clip-text text-transparent'>
                            By {author || "Unknown"}
                        </span>
                        <span className='text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full border border-gray-200 dark:border-gray-700'>
                            {new Date(publishedAt).toLocaleDateString()}
                        </span>
                    </div>
                    
                    <div className='mt-3 inline-flex items-center'>
                        <div className='flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 px-3 py-1.5 rounded-full border border-blue-200/50 dark:border-blue-700/50 group-hover:border-blue-300/70 dark:group-hover:border-blue-600/70 transition-all duration-300'>
                            <div className='w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse'></div>
                            <span className='text-xs font-semibold text-blue-600 dark:text-blue-400 tracking-wide'>
                                Source: {source.name}
                            </span>
                        </div>
                    </div>
                </div>
                
                <div className='absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-300/50 dark:via-blue-600/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
            </div>
        </div>
    )
}

export default NewsCard
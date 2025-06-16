import axios from 'axios';
import React, { useEffect, useState } from 'react'
import NewsCard from '../components/NewsCard';
import { Loader2 } from 'lucide-react';

const News = ({ country, category, articles, setArticles }) => {

    const [loading, setLoading] = useState(false)

    const fetchAllNews = async () => {
        try {
            setLoading(true)
            const res = await axios.get(`https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${import.meta.env.VITE_API_KEY}`)
            
            setArticles(res.data.articles);
            console.log(res.data.articles);
        } catch (error) {
            console.log(error);
        } finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchAllNews()
    }, [category])
    
    return (
        <>
            {
                loading ? 
                <div className='bg-gradient-to-br from-slate-100 via-white to-slate-200 dark:from-gray-900 dark:via-slate-800 dark:to-gray-900 h-screen flex flex-col gap-6 items-center justify-center relative overflow-hidden'>
                    {/* Animated background elements */}
                    <div className='absolute inset-0 overflow-hidden pointer-events-none'>
                        {[...Array(6)].map((_, i) => (
                            <div
                                key={i}
                                className='absolute w-32 h-32 border border-blue-200/20 dark:border-blue-700/20 rounded-full animate-pulse'
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                    animationDelay: `${i * 0.8}s`,
                                    animationDuration: `${3 + Math.random() * 2}s`
                                }}
                            />
                        ))}
                    </div>
                    
                    {/* Enhanced loader */}
                    <div className='relative'>
                        <div className='absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl animate-pulse'></div>
                        <div className='relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-full border border-blue-200/50 dark:border-blue-700/50 shadow-2xl'>
                            <Loader2 className='h-12 w-12 animate-spin text-blue-600 dark:text-blue-400' />
                        </div>
                    </div>
                    
                    {/* Enhanced loading text */}
                    <div className='text-center space-y-2'>
                        <h1 className='text-gray-800 text-2xl font-bold dark:text-gray-100 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 dark:from-cyan-400 dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent'>
                            Loading News...
                        </h1>
                        <p className='text-gray-600 dark:text-gray-400 text-sm font-medium'>
                            Fetching the latest updates for you
                        </p>
                        
                        {/* Loading progress dots */}
                        <div className='flex justify-center space-x-1 pt-2'>
                            {[...Array(3)].map((_, i) => (
                                <div
                                    key={i}
                                    className='w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full animate-bounce'
                                    style={{ animationDelay: `${i * 0.2}s` }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                :
                <div className='bg-gradient-to-br from-slate-100 via-gray-50 to-slate-200 dark:from-gray-900 dark:via-slate-800 dark:to-gray-900 py-24 px-4 md:px-0 min-h-screen relative'>
                    {/* Background pattern */}
                    <div className='absolute inset-0 overflow-hidden pointer-events-none opacity-30'>
                        <div className='absolute inset-0' style={{
                            backgroundImage: `
                                radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                                radial-gradient(circle at 75% 75%, rgba(147, 51, 234, 0.1) 0%, transparent 50%)
                            `
                        }}></div>
                    </div>
                    
                    {/* Enhanced container */}
                    <div className='max-w-7xl mx-auto relative'>
                        {/* Category header */}
                        <div className='text-center mb-12'>
                            <h1 className='text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 dark:from-cyan-400 dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent'>
                                {category ? category.charAt(0).toUpperCase() + category.slice(1) : 'Latest'} News
                            </h1>
                            <div className='w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full'></div>
                        </div>
                        
                        {/* Enhanced grid */}
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 relative'>
                            {/* Grid background decoration */}
                            <div className='absolute inset-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pointer-events-none opacity-5'>
                                {articles.map((_, index) => (
                                    <div key={index} className='bg-gradient-to-br from-blue-200 to-purple-200 dark:from-blue-800 dark:to-purple-800 rounded-xl'></div>
                                ))}
                            </div>
                            
                            {/* News cards */}
                            {
                                articles.map((article, index) => {
                                    return (
                                        <div 
                                            key={index} 
                                            className='transform hover:scale-[1.02] transition-all duration-500 relative'
                                            style={{
                                                animationDelay: `${index * 0.1}s`
                                            }}
                                        >
                                            {/* Card highlight effect */}
                                            <div className='absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10 blur-xl'></div>
                                            
                                            <NewsCard article={article} />
                                        </div>
                                    )
                                })
                            }
                        </div>
                        
                        {/* Bottom decoration */}
                        <div className='mt-16 text-center'>
                            <div className='inline-flex items-center space-x-2 text-gray-500 dark:text-gray-400 text-sm'>
                                <div className='w-8 h-px bg-gradient-to-r from-transparent to-gray-400'></div>
                                <span className='font-medium'>Stay Informed</span>
                                <div className='w-8 h-px bg-gradient-to-l from-transparent to-gray-400'></div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default News
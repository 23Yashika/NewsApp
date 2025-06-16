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
        } finally {
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
                <div className='min-h-screen bg-gradient-to-br from-black via-purple-950 to-blue-950 flex flex-col gap-6 items-center justify-center relative overflow-hidden'>
                    {/* Animated background particles */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        {[...Array(20)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-20 animate-pulse"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                    animationDelay: `${i * 0.3}s`,
                                    animationDuration: `${2 + Math.random() * 3}s`
                                }}
                            />
                        ))}
                    </div>

                    {/* Holographic grid background */}
                    <div className="absolute inset-0 opacity-5">
                        <div className="h-full w-full" style={{
                            backgroundImage: `
                                linear-gradient(rgba(0,255,255,0.3) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(0,255,255,0.3) 1px, transparent 1px)
                            `,
                            backgroundSize: '40px 40px'
                        }}></div>
                    </div>

                    {/* Loading container */}
                    <div className="relative bg-gradient-to-br from-black/90 via-purple-950/90 to-blue-950/90 backdrop-blur-lg p-12 rounded-3xl border border-purple-500/30 shadow-2xl shadow-cyan-500/20">
                        <div className="flex flex-col items-center gap-6">
                            {/* Enhanced loader */}
                            <div className="relative">
                                <Loader2 className='h-16 w-16 animate-spin text-cyan-400' style={{
                                    filter: 'drop-shadow(0 0 20px rgba(0,255,255,0.5))'
                                }} />
                                <div className="absolute inset-0 h-16 w-16 border-4 border-purple-500/30 border-t-transparent rounded-full animate-spin" style={{ animationDuration: '3s', animationDirection: 'reverse' }}></div>
                            </div>

                            {/* Glowing loading text */}
                            <h1 className='text-2xl font-bold text-transparent bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text animate-pulse' style={{
                                textShadow: '0 0 20px rgba(0,255,255,0.5)'
                            }}>
                                Loading News Feed...
                            </h1>

                            {/* Loading progress indicator */}
                            <div className="flex space-x-2">
                                {[...Array(3)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce"
                                        style={{
                                            animationDelay: `${i * 0.2}s`,
                                            boxShadow: '0 0 10px rgba(0,255,255,0.7)'
                                        }}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Corner accents */}
                        <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-cyan-400 opacity-60"></div>
                        <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-cyan-400 opacity-60"></div>
                        <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-cyan-400 opacity-60"></div>
                        <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-cyan-400 opacity-60"></div>
                    </div>
                </div>
                :
                <div className='min-h-screen bg-gradient-to-br from-black via-purple-950 to-blue-950 py-24 px-4 md:px-8 relative overflow-hidden'>
                    {/* Background effects */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        {/* Animated particles */}
                        {[...Array(30)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-10 animate-pulse"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                    animationDelay: `${i * 0.4}s`,
                                    animationDuration: `${3 + Math.random() * 4}s`
                                }}
                            />
                        ))}
                    </div>

                    {/* Holographic grid */}
                    <div className="absolute inset-0 opacity-5">
                        <div className="h-full w-full" style={{
                            backgroundImage: `
                                linear-gradient(rgba(0,255,255,0.2) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(0,255,255,0.2) 1px, transparent 1px)
                            `,
                            backgroundSize: '60px 60px'
                        }}></div>
                    </div>

                    {/* Scanning lines */}
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-30 animate-pulse"></div>
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>

                    {/* News grid container */}
                    <div className='max-w-7xl mx-auto relative'>
                        {/* Header glow effect */}
                        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-96 h-24 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 blur-3xl opacity-50"></div>
                        
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
                            {
                                articles.map((article, index) => {
                                    return <NewsCard key={index} article={article} />
                                })
                            }
                        </div>

                        {/* Bottom accent line */}
                        <div className="mt-16 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"></div>
                    </div>
                </div>
            }
        </>
    )
}

export default News
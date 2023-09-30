import React from 'react'

const Hero = () => {
    return (
        <header className='w-full flex flex-col items-center'>
            <nav className='w-full flex justify-between p-2
            mb-10 pt-3'>
                <img src="./src/assets/logo.svg" alt="logo"
                    className='w-28' />

                <button className='bg-gray-900 text-slate-50 px-5 py-1.5 rounded-full hover:bg-white hover:text-slate-800 transition-all duration-300 border border-black'
                    onClick={() => window.open("https://github.com/robiulsagor/")}>Github</button>
            </nav>

            <h1 className='mt-5 text-5xl font-extrabold leading-[1.15] text-black sm:text-6xl text-center'>
                Summarize Articles with <br className='max-md:hidden' />
                <span className='bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 bg-clip-text text-transparent'>OpenAI GPT-4</span>
            </h1>

            <h2 className='text-center mt-5 text-xl sm:text-2xl text-gray-600 max-w-2xl'>
                Summarize your reading with Summarize, an open-source article summarizer that transforms lengthy articles into clear and concise summarizes
            </h2>

        </header>
    )
}

export default Hero

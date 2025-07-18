import React from 'react'
import LOGO from '../assets/LOGO.png'

const Footer = () => {
    return (
        <footer className="bg-[#23272A] px-8 md:px-20 lg:px-32 xl:px-40 pt-12 w-full text-[#B0B3B8] mt-24 font-sans">
            <div className="flex flex-col md:flex-row justify-between w-full gap-12 border-b border-[#393C40] pb-8">
                <div className="md:max-w-96 flex flex-col items-start">
                    <img className="h-25" src={LOGO} alt="logo"/>
                    <p className="text-base leading-relaxed">
                        Experience the power of AI with ToolAi.<br />
                        Transform your content creation with our suite of premium AI tools. Write articles, generate images, and enhance your workflow.
                    </p>
                </div>
                <div className="flex-1 flex flex-col md:flex-row items-start md:justify-end gap-20">
                    <div>
                        <h2 className="font-semibold mb-6 text-white tracking-wide uppercase text-sm">Company</h2>
                        <ul className="text-base space-y-3">
                            <li><a className="hover:text-[#FF6F00] transition" href="#">Home</a></li>
                            <li><a className="hover:text-[#FF6F00] transition" href="#">About us</a></li>
                            <li><a className="hover:text-[#FF6F00] transition" href="#">Contact us</a></li>
                            <li><a className="hover:text-[#FF6F00] transition" href="#">Privacy policy</a></li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="font-semibold text-white mb-6 tracking-wide uppercase text-sm">Subscribe</h2>
                        <div className="text-base space-y-3">
                            <p>The latest news, articles, and resources, sent to your inbox weekly.</p>
                            <div className="flex items-center gap-2 pt-2">
                                <input
                                    className="border border-[#393C40] bg-[#181A1B] placeholder-[#B0B3B8] focus:ring-2 ring-[#FF6F00] outline-none w-full max-w-64 h-10 rounded px-3 text-white"
                                    type="email"
                                    placeholder="Enter your email"
                                />
                                <button className="bg-[#FF6F00] w-28 h-10 text-white rounded font-semibold hover:bg-[#FF8C1A] transition">Subscribe</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <p className="pt-6 text-center text-xs md:text-sm pb-6 text-[#B0B3B8]">
                Copyright 2025 © GreatStack. All Right Reserved.
            </p>
        </footer>
    )
}

export default Footer

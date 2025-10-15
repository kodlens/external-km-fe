import { useState } from 'react'
import { Link } from 'react-router';
import './style.css'
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Search } from 'lucide-react';
import axios from 'axios';

const Welcome = () => {

    const [search, setSearch] = useState('')

    const { data, isFetching } = useQuery({
        queryKey: ['search'],
        queryFn: async () => {
            const res = await axios.get(`get-sample`)
            return res.data
        }
    })

    const handleKeyDown = (e: any) => {
        e.preventDefault();
        console.log(search);
    }

    return (
        <>
            <header className="header-area header-sticky">
                <nav className="flex items-center p-10">
                    <div className=''>
                        <Link to="/" className="logo">
                            <img src="./images/logo.png" alt="" style={{ width: "140px" }} />
                        </Link>
                    </div>

                    <div className="ml-auto">
                        <div className='flex gap-4 items-center text-white '>
                            <div className='active'>
                                <Link to="/">Home</Link>
                            </div>
                            <div>
                                <Link to="#">Latest Topics</Link>
                            </div>
                            <div>
                                <Link to="#">About Us</Link>
                            </div>
                        </div>
                    </div>

                    {/* <a className='menu-trigger'>
                <span>Menu</span>
            </a> */}
                </nav>
            </header>

            <div className="main-banner" style={{
                height: '100vh',
                backgroundImage: `url(./images/banner-bg.jpg)`,
                borderRadius: `0px 0px 150px 150px`,
                backgroundPosition: `center bottom`,
                backgroundRepeat: `no-repeat`,
                backgroundSize: `cover`,
                padding: `150px 0px`,
                zIndex: -1
            }}>

                <div className="text-center">
                    <div className="">
                        <h6 className='text-xl md:text-2xl font-bold text-white md:p-4 mb-2 uppercase lg:leading-4'>Welcome To</h6>
                        <h2 className='text-4xl md:text-6xl font-extrabold text-white uppercase md:p-4 lg:leading-8'>STII - Knowledge Management</h2>
                        <p className='max-w-4xl mx-2 md:mx-auto md:leading-6 mt-4 text-white'>The Science and Technology Information Institute (STII) champions knowledge management by organizing, preserving, and disseminating credible S&T resources to support evidence-based decision-making and innovation. 
                            {/* Through its digital platforms and partnerships, STII ensures accessible and inclusive information delivery for researchers, educators, and the general public. */}
                        </p>
                        <div className="mt-4 lg:max-w-4xl lg:mx-auto">
                            <div className="flex rounded-4xl overflow-hidden">
                                <div className='flex-1'>
                                    <input
                                        type="text"
                                        className="bg-white text-[#7a7a7a] px-6 py-4 w-full outline-0 "
                                        placeholder="Search here..."
                                        name="search"
                                        value={search}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                handleKeyDown(e);
                                            }
                                        }}
                                        onChange={(e) => setSearch(e.target.value)}
                                        autoComplete="off"
                                    />
                                </div>
                                <button
                                    type="button"
                                    className="bg-danger py-4 pl-4 pr-6 text-white cursor-pointer active:bg-red-500 duration-150 hover:bg-red-400 ease-in-out outline-0"
                                    onClick={() => {
                                    console.log(search);
                                    }}
                                >
                                    <div className='flex gap-2 items-center'>  <Search size={18}/> Search Now</div>
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>



            <div>
                Baw lang ani unsa akong ebutang deri
            </div>

        </>
    )
}

export default Welcome
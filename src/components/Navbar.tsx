const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 w-full bg-primary/90 backdrop-blur-md z-50 shadow-md">
            <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
                {/* Logo / Brand */}
                <a href="/" className="text-xl font-bold tracking-wide hover:text-white/80 transition text-white">
                    STII-KM
                </a>

                {/* Links */}
                <div className="flex gap-6 text-white">
                    <a
                        href="#search"
                        className="hover:text-white/80 transition-colors text-sm font-medium"
                    >
                        Search
                    </a>
                    {/* <a
                        href="#subjects"
                        className="hover:text-white/80 transition-colors text-sm font-medium"
                    >
                        Subjects
                    </a> */}
                </div>
            </div>
        </nav>
    )
}

export default Navbar;

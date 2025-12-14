const CircleLoading = () => {
    return (
       
            <span className="flex items-center gap-2">
                <svg
                    className="animate-spin h-4 w-4 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                </svg>
            </span>
    )
}

export default CircleLoading
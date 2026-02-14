const OfficeMap = () => {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
            <div className="mb-3 flex items-center justify-between gap-3">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-700">
                    Find Us on Google Maps
                </h2>
                <a
                    href="https://www.google.com/maps?q=DOST-STII+Bicutan+Taguig+City"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-semibold text-sky-700 hover:text-sky-800"
                >
                    Open in Google Maps
                </a>
            </div>
            <div className="overflow-hidden rounded-xl border border-slate-200">
                <iframe
                    title="DOST-STII Location Map"
                    src="https://maps.google.com/maps?q=DOST-STII%20Bicutan%20Taguig%20City&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    className="h-[320px] w-full md:h-[380px]"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />
            </div>
        </div>
    )
}

export default OfficeMap

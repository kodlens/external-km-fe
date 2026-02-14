import { Mail, MapPin, Phone } from "lucide-react"
import OfficeMap from "../../components/OfficeMap"

const ContactIndex = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-sky-50/60 via-white to-white px-4 py-10 md:px-6">
            <div className="mx-auto w-full max-w-5xl">
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
                    <span className="inline-flex rounded-full border border-sky-100 bg-sky-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-sky-700">
                        Contact
                    </span>
                    <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
                        Get in Touch
                    </h1>
                    <p className="mt-2 max-w-2xl text-sm text-slate-600 md:text-base">
                        For questions about STII Knowledge Management resources, you can reach us through the
                        information below.
                    </p>

                    <div className="mt-8 grid gap-4 md:grid-cols-3">
                        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                            <div className="mb-2 inline-flex rounded-lg bg-white p-2 text-sky-700 ring-1 ring-slate-200">
                                <Mail size={18} aria-hidden="true" />
                            </div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Email</p>
                            <p className="mt-1 text-sm font-medium text-slate-800">stii@dost.gov.ph</p>
                        </div>

                        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                            <div className="mb-2 inline-flex rounded-lg bg-white p-2 text-sky-700 ring-1 ring-slate-200">
                                <Phone size={18} aria-hidden="true" />
                            </div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Phone</p>
                            <p className="mt-1 text-sm font-medium text-slate-800">(02) 8837-2071</p>
                        </div>

                        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                            <div className="mb-2 inline-flex rounded-lg bg-white p-2 text-sky-700 ring-1 ring-slate-200">
                                <MapPin size={18} aria-hidden="true" />
                            </div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Office</p>
                            <p className="mt-1 text-sm font-medium text-slate-800">
                                Bicutan, Taguig City, Metro Manila
                            </p>
                        </div>
                    </div>

                    <div className="mt-6">
                        <OfficeMap />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactIndex

import { ChevronDown } from "lucide-react"
import { useState } from "react"
import { Badges } from "../sections/Assets"

export default function Accordion({
    arrowBadge,
    title,
    content,
    arrowPosition
}) {
    const [open, setOpen] = useState(false)

    return (
        <div className="w-full flex relative">
            <div className="w-full overflow-hidden rounded-[40px] border-[3px] border-sariyellowlight">
                <div
                    className={`relative flex items-center justify-between bg-sariyellowlight transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]
                        ${arrowPosition == 'left' ? 'flex-row-reverse pr-8 max-sm:pr-5 pl-14 max-sm:pl-11' : arrowPosition == 'right' ? 'flex-row pl-8 max-sm:pl-5 pr-14 max-sm:pr-11' : '' }`}>
                    <h1 className="py-7 max-sm:py-5 text-2xl max-sm:text-sm text-left w-full text-sariblack">
                        {title}
                    </h1>
                </div>

                <div
                    className={`grid transition-all duration-500 ease-[cubic-bezier(0.25,1,0 
                        ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                    <div className="overflow-hidden">
                        <div
                            className={`bg-white border-t-[3px] border-sariyellowlight origin-top transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${open ? 'translate-y-0 scale-y-100 px-8 py-7' : '-translate-y-2 scale-y-95 px-8 py-0' } ${arrowPosition == 'left' ? 'pr-8 max-sm:pr-5 pl-14 max-sm:pl-11' : arrowPosition == 'right' ? 'pl-8 max-sm:pl-5 pr-14 max-sm:pr-11' : '' }`}>
                            <p className="text-sariblack text-base/[145%]">
                                {content}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <button
                className={`cursor-pointer z-30 flex items-center justify-center text-sariyellow transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]
                    ${arrowPosition == 'left' ? '-order-1 -mr-10' : arrowPosition == 'right' ? '-ml-10' : '-ml-10' }
                    ${open ? 'rotate-180': 'rotate-0'}`}
                onClick={() => setOpen(!open)}>

                <ChevronDown
                    className="absolute size-6 max-sm:size-4 text-sariblack z-10"/>

                <Badges
                    type={arrowBadge}
                    className="w-20 max-sm:w-14 h-auto text-sariyellowdark"/>
            </button>
        </div>
    )
}
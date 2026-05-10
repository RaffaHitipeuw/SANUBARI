import { ChevronDown } from "lucide-react"
import { useState } from "react"
import { Badges } from "../sections/Assets"

export default function Accordion({arrowBadge, title, content, arrowPosition}) {
    const [open, setOpen] = useState(false)
    return(
        <div>
            <div className={`accordion-title ${arrowPosition == 'left' ? 'flex-row-reverse pr-6' : arrowPosition == 'right' ? 'flex-row pl-6' : ''} ${open ? '' : 'rounded-b-[40px]'}`} >
                <h1>{title}</h1>
                <button className={`relative text-sariyellow flex items-center justify-center ${arrowPosition == 'left' ? '-ml-10' : arrowPosition == 'right' ? '-mr-10' : ''}`} onClick={() => setOpen(!open)}>
                    <ChevronDown size={32} className="absolute text-sariblack"/>
                    <Badges type={arrowBadge} className="w-20 h-auto"/>
                </button>
            </div>
            <div className={`accordion-content ${open ? 'open' : ''}`}>
                <p>{content}</p>
            </div>
        </div>
    )
}
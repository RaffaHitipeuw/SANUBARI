import Accordion from "../accordion/Accordion";

export default function FAQ() {
    return(
        <section className="grid grid-cols-12 px-40 gap-6 py-20">
            <div className="chip-title text-left col-span-3 justify-start">
                <span className="chip text-sariblue">FAQ</span>
                <h1 className="heading-1">Masih Bingung?</h1>
            </div>
            <div className="flex flex-col col-span-9 gap-6">
                <Accordion title={'Raffa Hittipeuw'} content={"MA'AM oasfomweofmowefoi asfmw wefk wefkmwefgw wegkjwenf wekm ewfk asdnjas"} arrowBadge={'maa'} arrowPosition={'right'} />
                <Accordion title={'Raffa Hittipeuw'} content={"MA'AM oasfomweofmowefoi asfmw wefk wefkmwefgw wegkjwenf wekm ewfk asdnjas"} arrowBadge={'rtt'} arrowPosition={'left'} />
                <Accordion title={'Raffa Hittipeuw'} content={"MA'AM oasfomweofmowefoi asfmw wefk wefkmwefgw wegkjwenf wekm ewfk asdnjas"} arrowBadge={'ht'} arrowPosition={'right'} />
            </div>
        </section>
    )
}
import Accordion from "../accordion/Accordion";

export default function FAQ() {
    return(
        <section className="grid grid-cols-12 max-sm:grid-cols-1 px-40 max-sm:px-4 gap-6 max-sm:gap-8 py-20">
            <div className="chip-title text-left max-sm:text-center col-span-3 max-sm:col-span-1 justify-start max-sm:items-center">
                <span className="chip text-sariblue">FAQ</span>
                <h1 className="heading-1">Masih <br className="hidden max-sm:inline" />Bingung?</h1>
            </div>
            <div className="flex flex-col col-span-9 max-sm:col-span-1 gap-6">
                <Accordion title={'Raffa Hittipeuw asdiuqfw uiqewfbuy qewfuiqwebdu qjhbwfu quwbuqwau bqwfb'} content={"MA'AM oasfomweofmowefoi asfmw wefk wefkmwefgw wegkjwenf wekm ewfk asdnjas"} arrowBadge={'maa'} arrowPosition={'right'} />
                <Accordion title={'Raffa Hittipeuw asdiuqfw uiqewfbuy qewfuiqwebdu qjhbwfu quwbuqwau bqwfb'} content={"MA'AM oasfomweofmowefoi asfmw wefk wefkmwefgw wegkjwenf wekm ewfk asdnjas"} arrowBadge={'rtt'} arrowPosition={'left'} />
                <Accordion title={'Raffa Hittipeuw asdiuqfw uiqewfbuy qewfuiqwebdu qjhbwfu quwbuqwau bqwfb'} content={"MA'AM oasfomweofmowefoi asfmw wefk wefkmwefgw wegkjwenf wekm ewfk asdnjas"} arrowBadge={'ht'} arrowPosition={'right'} />
            </div>
        </section>
    )
}
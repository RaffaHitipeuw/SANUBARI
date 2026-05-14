import { ArrowLeft, ArrowRight } from "lucide-react";
import { Badges, HealthTrends, HealthTrendsRotate, StarFill } from "./Assets";

export default function Testimonial() {
    return(
        <section className="relative items-center justify-center flex flex-col gap-12 bg-sariwhite py-28">
            <div className="chip-title text-center items-center">
                <span className="chip text-sariblue">Testimoni</span>
                <h1 className="heading-1">Kata Mereka</h1>
            </div>
            <div className="relative flex items-center justify-center">
                <button className="navigation z-5 right-0 translate-x-14">
                    <ArrowRight size={18}/>
                </button>
                <button className="navigation z-5 left-0 -translate-x-14">
                    <ArrowLeft size={18}/>
                </button>

                {/* TEMPLATE KONTEN TESTIMONI BUAT RAFFA!! */}
                <div className="testimonial relative bg-sariredlight z-3">
                    <div className="flex flex-col gap-2 w-250 pl-14 py-10">
                        <img src="/src/assets/images/testimonial-user.png" alt="Sam Nook, CEO at PT. Pujasera" className="-mt-25 w-40 h-auto" />
                        <h1 className="text-sarired text-[40px] font-mr font-semibold">Sam Nook</h1>
                        <h2>CEO at PT. Pujasera</h2>
                    </div>
                    <div className="flex flex-col justify-between pr-14 py-10 relative overflow-clip rounded-r-[56px]">
                        <p className="text-base/[145%]">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi explicabo quo saepe vel. Iure laborum autem quam, similique, esse optio vero velit quia blanditiis, a vel obcaecati quos sunt laboriosam?</p>
                        <span className="testimonial-star">
                            <StarFill className={'w-4 h-auto'} />
                            <StarFill className={'w-4 h-auto'} />
                            <StarFill className={'w-4 h-auto'} />
                            <StarFill className={'w-4 h-auto'} />
                            <StarFill className={'w-4 h-auto'} />
                        </span>
                        <HealthTrendsRotate className={'text-sarired absolute -bottom-17 right-0 h-auto w-42'}/>
                    </div>
                </div>
                <div className="testimonial bg-sarireddark absolute *:opacity-0 mt-6 mr-4 rotate-1 origin-top-left z-2">
                    <div className="flex flex-col gap-2 w-250 pl-14 py-10">
                        <img src="/src/assets/images/testimonial-user.png" alt="Sam Nook, CEO at PT. Pujasera" className="-mt-25 w-40 h-auto" />
                        <h1 className="text-sarired text-[40px] font-mr font-semibold">Sam Nook</h1>
                        <h2>CEO at PT. Pujasera</h2>
                    </div>
                    <div className="flex flex-col justify-between pr-14 py-10 relative overflow-clip rounded-r-[56px]">
                        <p className="text-base/[145%]">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi explicabo quo saepe vel. Iure laborum autem quam, similique, esse optio vero velit quia blanditiis, a vel obcaecati quos sunt laboriosam?</p>
                        <span className="testimonial-star">
                            <StarFill className={'w-4 h-auto'} />
                            <StarFill className={'w-4 h-auto'} />
                            <StarFill className={'w-4 h-auto'} />
                            <StarFill className={'w-4 h-auto'} />
                            <StarFill className={'w-4 h-auto'} />
                        </span>
                        <HealthTrendsRotate className={'text-sarired absolute -bottom-17 right-0 h-auto w-42'}/>
                    </div>
                </div>
                <div className="testimonial bg-sarireddarker absolute *:opacity-0 mt-12 mr-8 rotate-2 origin-top-left z-1">
                    <div className="flex flex-col gap-2 w-250 pl-14 py-10">
                        <img src="/src/assets/images/testimonial-user.png" alt="Sam Nook, CEO at PT. Pujasera" className="-mt-25 w-40 h-auto" />
                        <h1 className="text-sarired text-[40px] font-mr font-semibold">Sam Nook</h1>
                        <h2>CEO at PT. Pujasera</h2>
                    </div>
                    <div className="flex flex-col justify-between pr-14 py-10 relative overflow-clip rounded-r-[56px]">
                        <p className="text-base/[145%]">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi explicabo quo saepe vel. Iure laborum autem quam, similique, esse optio vero velit quia blanditiis, a vel obcaecati quos sunt laboriosam?</p>
                        <span className="testimonial-star">
                            <StarFill className={'w-4 h-auto'} />
                            <StarFill className={'w-4 h-auto'} />
                            <StarFill className={'w-4 h-auto'} />
                            <StarFill className={'w-4 h-auto'} />
                            <StarFill className={'w-4 h-auto'} />
                        </span>
                        <HealthTrendsRotate className={'text-sarired absolute -bottom-17 right-0 h-auto w-42'}/>
                    </div>
                </div>
            </div>
            <span className="flex gap-4 mt-6">
                <Badges type={'ht'} className={'w-3 text-sarired h-auto'}/>
                <Badges type={'bullet'} className={'w-2 text-sariredlight h-auto'}/>
                <Badges type={'bullet'} className={'w-2 text-sariredlight h-auto'}/>
                <Badges type={'bullet'} className={'w-2 text-sariredlight h-auto'}/>
                <Badges type={'bullet'} className={'w-2 text-sariredlight h-auto'}/>
                <Badges type={'bullet'} className={'w-2 text-sariredlight h-auto'}/>
            </span>
        </section>
    )
}
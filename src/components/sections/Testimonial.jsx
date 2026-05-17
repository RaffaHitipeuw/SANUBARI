import { ArrowLeft, ArrowRight } from "lucide-react";
import React, { useState } from "react";
import { Badges, HealthTrendsRotate, StarFill } from "./Assets";

export default function Testimonial() {
    const testimonials = [
        {
            name: "Sam Nook",
            role: "CEO at PT. Pujasera",
            text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi explicabo quo saepe vel. Iure laborum autem quam, similique, esse optio vero velit quia blanditiis, a vel obcaecati quos sunt laboriosam?",
        },
        {
            name: "Raffa Hitipeuw",
            role: "Frontend Developer",
            text: "SANUBARI membantu saya memahami kondisi jantung dengan UI yang modern dan pengalaman yang nyaman.",
        },
        {
            name: "Ahmad Fauzi",
            role: "Mahasiswa",
            text: "Fitur AI dan monitoring BPM real-time sangat membantu saya memahami kesehatan tubuh saya.",
        },
    ];

    const [cards, setCards] = useState([0, 1, 2]);
    const [animating, setAnimating] = useState(false);
    const [movingCard, setMovingCard] = useState(null);
    const [direction, setDirection] = useState("next");

    const nextCard = () => {
        if (animating) return;

        setDirection("next");
        setAnimating(true);

        const front = cards[0];
        setMovingCard(front);

        setTimeout(() => {
            setCards(([a, b, c]) => [b, c, a]);
        }, 420);

        setTimeout(() => {
            setMovingCard(null);
            setAnimating(false);
        }, 900);
    };

    const prevCard = () => {
        if (animating) return;

        setDirection("prev");
        setAnimating(true);

        const back = cards[2];
        setMovingCard(back);

        setTimeout(() => {
            setCards(([a, b, c]) => [c, a, b]);
        }, 420);

        setTimeout(() => {
            setMovingCard(null);
            setAnimating(false);
        }, 900);
    };

    return (
        <section className="relative items-center justify-center flex flex-col gap-12 bg-sariwhite py-28 overflow-hidden">
            <div className="chip-title text-center items-center">
                <span className="chip text-sarired">Testimoni</span>
                <h1 className="heading-1">Kata Mereka</h1>
            </div>

            <div className="relative flex items-center justify-center min-h-[520px] w-full">
                <button
                    onClick={prevCard}
                    className="navigation z-[999] absolute left-87"
                    disabled={animating}
                >
                    <ArrowLeft size={18} />
                </button>

                <button
                    onClick={nextCard}
                    className="navigation z-[999] absolute right-87"
                    disabled={animating}
                >
                    <ArrowRight size={18} />
                </button>

                {testimonials.map((item, index) => {
                    const isFront = cards[0] === index;
                    const isMiddle = cards[1] === index;
                    const isBack = cards[2] === index;

                    if (!isFront && !isMiddle && !isBack) return null;

                    const isMoving = movingCard === index;

                    let bgColor = "";
                    let zIndex = "";
                    let transform = "";

                    if (isFront) {
                        bgColor = "bg-sariredlight";
                        zIndex = "z-30";

                        if (isMoving && direction === "next") {
                            transform =
                                "translate3d(5rem,-7rem,0) rotate(-7deg) scale(.88)";
                        } else {
                            transform =
                                "translate3d(0rem,0rem,0) rotate(0deg) scale(1)";
                        }
                    }
                    else if (isMiddle) {
                        bgColor = "bg-sarireddark";
                        zIndex = "z-20";

                        transform =
                            "translate3d(0.8rem,1.5rem,0) rotate(2deg) scale(.96)";
                        if (animating && direction === "next") {
                            transform =
                                "translate3d(-1rem,3rem,0) rotate(2deg) scale(.96)";
                        }
                        if (animating && direction === "prev") {
                            transform =
                                "translate3d(-2rem,3.6rem,0) rotate(3deg) scale(.94)";
                        }
                    }
                    else if (isBack) {
                        bgColor = "bg-sarireddarker";
                        zIndex = "z-10";
                        transform =
                            "translate3d(-1.8rem,3rem,0) rotate(4deg) scale(.92)";
                        if (isMoving && direction === "prev") {
                            zIndex = "z-40";

                            transform =
                                "translate3d(5rem,-7rem,0) rotate(-7deg) scale(.88)";
                        }
                        else if (animating && direction === "next") {
                            transform =
                                "translate3d(-2.5rem,4.6rem,0) rotate(5deg) scale(.9)";
                        }
                    }

                    return (
                        <div
                            key={index}
                            className={`
                                testimonial
                                absolute
                                ${bgColor}
                                ${zIndex}
                                origin-center
                                will-change-transform
                            `}
                            style={{
                                transform,
                                transitionProperty: "transform",
                                transitionDuration: "900ms",
                                transitionTimingFunction:
                                    "cubic-bezier(0.16, 1, 0.3, 1)",
                            }}
                        >
                            <div className="flex flex-col gap-2 w-250 pl-14 py-10">
                                <img
                                    src="/src/assets/images/testimonial-user.png"
                                    alt={item.name}
                                    className="-mt-25 w-40 h-auto transition-all duration-700"
                                />

                                <h1 className="text-sarired text-[40px] font-mr font-semibold transition-all duration-700">
                                    {item.name}
                                </h1>

                                <h2 className="transition-all duration-700">
                                    {item.role}
                                </h2>
                            </div>

                            <div className="flex flex-col justify-between pr-14 py-10 relative overflow-clip rounded-r-[56px] transition-all duration-700">
                                <p className="text-base/[145%]">
                                    {item.text}
                                </p>

                                <span className="testimonial-star">
                                    <StarFill className="w-4 h-auto" />
                                    <StarFill className="w-4 h-auto" />
                                    <StarFill className="w-4 h-auto" />
                                    <StarFill className="w-4 h-auto" />
                                    <StarFill className="w-4 h-auto" />
                                </span>

                                <HealthTrendsRotate className="text-sarired absolute -bottom-17 right-0 h-auto w-42 transition-all duration-700" />
                            </div>
                        </div>
                    );
                })}
            </div>

            <span className="flex gap-4 mt-6 items-center">
                {testimonials.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            if (animating) return;

                            const currentFront = cards[0];

                            if (index === currentFront) return;

                            if ((currentFront + 1) % 3 === index) {
                                nextCard();
                            } else {
                                prevCard();
                            }
                        }}
                        className="transition-all duration-500"
                    >
                        <Badges
                            type={cards[0] === index ? "ht" : "bullet"}
                            className={
                                cards[0] === index
                                    ? "w-3 text-sarired h-auto scale-110"
                                    : "w-2 text-sariredlight h-auto opacity-70"
                            }
                        />
                    </button>
                ))}
            </span>
            <Badges type={'rtt'} className={'absolute size-150 z-1 opacity-5 top-10 -right-60'}/>
            <Badges type={'ht'} className={'absolute size-150 z-1 opacity-5 bottom-0 -left-60'}/>
        </section>
    );
}
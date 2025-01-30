import React from 'react'
import Marquee from "react-fast-marquee";
import Testimony from './Testimony'

const TestimonyData = [
    {
        id: 1,
        img: "/user-1.jpg",
        name: "John Doe",
        role: "Software Engineer",
        testimony: "This app has revolutionized my financial management. It's so intuitive and user-friendly."
    },
    {
        id: 2,
        img: "/user-2.jpg",
        name: "Jane Smith",
        role: "Marketing Manager",
        testimony: "I love how this app helps me stay on top of my expenses. It's a game-changer!"
    },
    {
        id: 3,
        img: "/user-3.jpg",
        name: "Michael Johnson",
        role: "Entrepreneur",
        testimony: "As a small business owner, this app has been a lifesaver. It's made budgeting and tracking expenses a breeze."
    },
    {
        id: 4,
        img: "/user-4.jpg",
        name: "Emily Davis",
        role: "Student",
        testimony: "This app has been a game-changer for me. It's made budgeting and tracking expenses a breeze."
        },
]

const TestimonyData2 = [
    {
        id: 1,
        img: "/user-5.jpg",
        name: "John Doe",
        role: "Software Engineer",
        testimony: "This app has revolutionized my financial management. It's so intuitive and user-friendly."
    },
    {
        id: 2,
        img: "/user-6.jpg",
        name: "Jane Smith",
        role: "Marketing Manager",
        testimony: "I love how this app helps me stay on top of my expenses. It's a game-changer!"
    },
    {
        id: 3,
        img: "/user-7.jpg",
        name: "Michael Johnson",
        role: "Entrepreneur",
        testimony: "As a small business owner, this app has been a lifesaver."
    },
    {
        id: 4,
        img: "/user-8.jpg",
        name: "Emily Davis",
        role: "Student",
        testimony: "This app has been a game-changer for me. It's made budgeting and tracking expenses a breeze."
    },
    {
        id: 5,
        img: "/user-9.jpg",
        name: "John Doe",
        role: "Software Engineer",
        testimony: "This app has revolutionized my financial management. It's so intuitive and user-friendly."
    }
]

type TestimonialProps = {
    direction: "left" | "right" | "up" | "down";
    // logos: string[];
}
const Testimonial: React.FC<TestimonialProps> = ({direction}) => {
  return (
    <div className='mt-20 overflow-hidden relative flex flex-col gap-4'>
        <div>
        <Marquee className='' direction="right" pauseOnHover={true} speed={40}>
            {TestimonyData.map((testimony) => {
                return (
                    <Testimony key={testimony.id} img={testimony.img} name={testimony.name} role={testimony.role} testimony={testimony.testimony} />
                )
            })}
        </Marquee>
        </div>

        <div>
        <Marquee className='' direction="left" pauseOnHover={true} speed={40}>
            {TestimonyData2.map((testimony) => {
                return (
                    <Testimony key={testimony.id} img={testimony.img} name={testimony.name} role={testimony.role} testimony={testimony.testimony} />
                )
            })}
        </Marquee>

        </div>

    </div>
  )
}

export default Testimonial
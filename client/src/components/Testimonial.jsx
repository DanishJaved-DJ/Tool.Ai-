import { assets } from "../assets/assets"

const Testimonial = () => {
    const dummyTestimonialData = [
        {
            image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
            name: 'John Doe',
            title: 'Marketing Director, TechCorp',
            content: 'ContentAI has revolutionized our content workflow. The quality of the articles is outstanding, and it saves us hours of work every week.',
            rating: 4,
        },
        {
            image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
            name: 'Jane Smith',
            title: 'Content Creator, TechCorp',
            content: 'ContentAI has made our content creation process effortless. The AI tools have helped us produce high-quality content faster than ever before.',
            rating: 5,
        },
        {
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop",
            name: 'David Lee',
            title: 'Content Writer, TechCorp',
            content: 'ContentAI has transformed our content creation process. The AI tools have helped us produce high-quality content faster than ever before.',
            rating: 4,
        },
    ]

    return (
        <div className='px-4 sm:px-20 xl:px-32 py-24 bg-gradient-to-br from-[#23272A] via-[#31363B] to-[#1A1D1F] min-h-screen'>
            <div className='text-center mb-12'>
                <h2 className='text-white text-[42px] font-bold tracking-tight drop-shadow-lg'>Loved by Creators</h2>
                <p className='text-gray-300 max-w-lg mx-auto text-lg'>Don't just take our word for it. Here's what our users are saying.</p>
            </div>
            <div className='flex flex-wrap gap-8 justify-center'>
                {dummyTestimonialData.map((testimonial, index) => (
                    <div key={index} className='relative p-8 max-w-xs rounded-2xl bg-gradient-to-tr from-[#23272A] via-[#31363B] to-[#1A1D1F] shadow-2xl border border-[#444] hover:scale-105 transition duration-300 cursor-pointer'>
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                            <img src={testimonial.image} className='w-16 h-16 object-cover rounded-full border-4 border-[#23272A] shadow-lg' alt='' />
                        </div>
                        <div className="flex items-center gap-1 justify-center mt-10 mb-4">
                            {Array(5).fill(0).map((_, i)=> (
                                <img
                                    key={i}
                                    src={i < testimonial.rating ? assets.star_icon : assets.star_dull_icon}
                                    className='w-5 h-5'
                                    alt="star"
                                />
                            ))}
                        </div>
                        <p className='text-gray-100 text-base italic mb-6 text-center'>" {testimonial.content} "</p>
                        <div className='text-center'>
                            <h3 className='font-semibold text-white text-lg'>{testimonial.name}</h3>
                            <p className='text-xs text-gray-400 mt-1'>{testimonial.title}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Testimonial
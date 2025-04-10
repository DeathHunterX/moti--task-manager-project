import Link from 'next/link'
import React from 'react'

const CTASection = () => {
  return (
    <section className='py-24 bg-[#4A6CF7] text-center text-white'>
        <h2 className='text-4xl mb-5'>Ready to Boost Your Team's Productivity?</h2>
        <p className='max-w-[600px] mx-auto my-10'>Join thousands of teams that use TaskFlow to streamline their work and deliver projects on time.</p>
        
        <Link href="/sign-in" className="bg-white text-[#4A6CF7] hover:bg-[#f8fafc] hover:-translate-y-1 transition-transform duration-300 px-6 py-3.5 rounded-sm font-medium">
          Start Your Free Trial
        </Link>
    </section>
    
  )
}

export default CTASection
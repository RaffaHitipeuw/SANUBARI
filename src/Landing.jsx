import { ArrowRight } from 'lucide-react';
import { useState } from 'react'

function Landing() {
  return (
    <>
      <section>
        <div className="">
          <h1>
            Monitor Detak Jantung Anda
            <span>Secara Instan</span>
          </h1>
          <h1></h1>
        </div>
        <div className="">
          <button>Pelajari Lebih Lanjut</button>
          <button>Mulai Sekarang {<ArrowRight />}</button>
        </div>
      </section>
    </>
  )
}

export default Landing;

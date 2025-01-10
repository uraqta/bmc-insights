import React from "react";

export default function Blog() {
  return (
    <section className="container mx-auto my-12 sm:my-24 px-4">
      <div className="mb-8">
        <h1 className="font-montserrat text-4xl sm:text-6xl my-4 font-bold text-primary">
          BLOGS
        </h1>
      </div>
      <div className=" text-sky-300 font-semibold mb-8 pb-4">
        <p className="text-lg sm:text-xl">
          To add your blog posts contact us at:{" "}
          <a href="mailto:insights@example.com" className="text-white underline decoration-[#2563eb]">
            insights@example.com
          </a>
        </p>
      </div>
      <div className="space-y-8">
        <div className="bg-[#010b13] bg-opacity-90 rounded-xl p-8 text-white">
          <a href="/blog/posts/floods" className="">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-blue-200">
              Floods - Monsoon Season in Nepal
            </h2>
          </a>
          <p className="text-lg sm:text-xl">
            Nepal, 19 August 2024: It has been a dreadful month of frantic
            searches for umbrellas, and staying in as much as possible. Just
            after a scorching hot summer, the monsoon rain began almost
            immediately. While this has been occurring everyday, how much do we
            actually know about it? Let us go into detail about the inevitable
            monsoon season.
          </p>
        </div>
        <div className="bg-[#010b13] bg-opacity-90 rounded-xl p-8 text-white">
          <a href="/blog/posts/freshers" className="">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-blue-200">
              Freshers Party 2024
            </h2>
          </a>
          <p className="text-lg sm:text-xl">
            Yala Durbar, August 18 2024: The students at the British Model
            College worked tirelessly to throw a welcome party for the freshly
            incoming batch of students. “BMC Freshers 2024” was a massive
            success, and the students had a night to remember.
          </p>
        </div>
      </div>
    </section>
  );
}

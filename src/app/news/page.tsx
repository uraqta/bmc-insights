import { notFound } from "next/navigation";
import { Heart, Upload } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

async function getData() {
  const res = await fetch("http://localhost:3000/api/news", { cache: "no-store" });
  if (!res.ok) return notFound();

  return res.json();
}

export default async function news() {
  const newsData = await getData();
  console.log(newsData);

  return (
    <section className="container mx-auto my-12 sm:my-24 bg-black text-white px-4 sm:px-8">
      <div className="text-center">
        <h1 className="font-bold text-5xl sm:text-6xl mb-6 text-primary">NEWS</h1>
      </div>

      <div className="space-y-12">
        <div className="col-span-full flex justify-center sm:justify-start mb-6">
          <Link href="news/create">
            <Button variant="outline" className="border-2 border-gray-500 text-gray-500 bg-transparent hover:bg-gray-800 hover:text-white transition-all ease-in-out duration-300">
              <Upload className="mr-2" /> Create News
            </Button>
          </Link>
        </div>

        {newsData.map((news) => (
          <div
            key={news?._id}
            className="flex flex-col sm:flex-row gap-6 lg:gap-8 items-center sm:items-start bg-[#010b13] rounded-lg p-6 hover:bg-[#020f1a] transition-all transform hover:scale-105 duration-300"
          >
            <div className="w-full sm:w-1/3 h-48 sm:h-64 overflow-hidden rounded-lg">
              <img className="w-full h-full object-cover rounded-lg" alt="newsImage" src={news?.imageUrl} />
            </div>

            <div className="w-full sm:w-2/3 space-y-4">
              <Link href={`./${news._id}`} className="text-2xl font-semibold text-white hover:text-gray-400 transition-colors duration-200">
                <h2>{news.title}</h2>
              </Link>
              <p className="line-clamp-4 text-sm text-gray-300 leading-relaxed">
                {news?.text}
              </p>

              <div className="flex justify-between items-center text-xs text-gray-400 mt-4">
                <div>
                  <div className="font-medium">{news?.username}</div>
                  <div className="opacity-60">Date Added</div>
                </div>

                <div className="flex items-center">
                  <Heart className="text-red-500" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

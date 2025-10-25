import { Navbar } from "@/components/ui";
import { NewsAnalysis } from "@/components/news-analysis";
export default function Home() {

  return (
    <div className="bg-[#252f41]">
      <div className="fixed inset-0 "></div>
      <Navbar logo={logo} className="overflow-hidden shadow-none" />

      <main className="text-black py-10 px-5 md:p-10">
        <header className="w-full block md:text-center text-left">
          <h1 className="mx-auto font-bold text-[#b2afaf] text-2xl md:text-3xl font-Count">
            ALIEN NEWS DETECTOR
          </h1>
        </header>

        <NewsAnalysis />
      </main>
    </div>
  );
}

const logo = (
    <span className="ml-2 text-xl text-[#ff8747] font-bold">
      NCorp
    </span>
);

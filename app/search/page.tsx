import React from "react";

type ComponentProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

async function SearchPage({ searchParams }: ComponentProps) {
  const query = await searchParams;
  const searchTerm = query.s;
  return (
    <div className="mt-20 h-full px-6 md:mt-24 lg:px-8">
      <div className="flex h-full flex-col items-center justify-center gap-2 text-xs uppercase">
        Search Result
      </div>
      <div className="relative mt-[10px] text-center text-base font-medium uppercase">
        {searchTerm && `“${searchTerm}”`}
        <p className="inline-block pr-1 text-[1px] font-normal">s</p>
        <sup className="absolute top-3 text-[11px] font-normal">{searchTerm && 73}</sup>
        <div className="mt-8 grid grid-cols-2 gap-4 md:mt-10 md:grid-cols-3 md:gap-6 lg:grid-cols-4"></div>
      </div>
    </div>
  );
}

export default SearchPage;

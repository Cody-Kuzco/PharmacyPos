"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { CiSearch } from "react-icons/ci";
import { useDebouncedCallback } from "use-debounce";

const Search = () => {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((e) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", 1);
    if (e.target.value) {
      e.target.value.length > 2 && params.set("q", e.target.value);
    } else {
      params.delete("q");
    }
    replace(`${pathName}?${params}`);
  }, 300);
  return (
    
      <input
        className="  px-1 py-2 outline-none bg-white border-gray-200 border-[1px] rounded-sm"
        type="text"
        placeholder="Search product by name"
        onChange={handleSearch}
      />
  
  );
};

export default Search;

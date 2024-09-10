import React, { useState } from "react";
import Image from "next/image";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";

import {
  category,
  product,
} from "@/redux/features/accessories/accessories-search-form-slice";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const AccessoriesSearchFormDesktop = () => {
  const accessoriesSearchFormState = useAppSelector(
    (state: RootState) => state.accessoriesSearchForm,
  );

  const dispatch = useAppDispatch();

  const [selectedCategory, setSelectedCategory] = useState("");
  return (
    <section className="rounded-[10px] bg-white p-8">
      <form id="accessories-search-form-desktop">
        {/* Car Search Form Input Fields */}
        <div
          id="accessories-search-form-inputs-desktop"
          className="relative mt-8"
        >
          <div className="flex gap-3">
            {/* Category Dropdown */}
            <div className="" onClick={() => {}}>
              <div
                className={`flex h-12 items-center gap-3 rounded border py-2 pl-3`}
              >
                <div className="flex items-center">
                  <Image
                    src="/assets/icons/category-icon.svg"
                    alt="Calendar Icon"
                    width={16}
                    height={16}
                    className="h-[16px] w-[16px]"
                  />

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <input
                        type="text"
                        value={accessoriesSearchFormState.category}
                        onChange={(e) => {
                          dispatch(category(e.target.value));
                        }}
                        className="ml-2 w-full flex-grow bg-transparent pr-2 outline-none placeholder:text-[16px]"
                        placeholder="Choose Category"
                        autoComplete="off"
                        required
                      />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuLabel>Choose Category</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuRadioGroup>
                        <DropdownMenuRadioItem
                          value="bags"
                          onClick={() => {
                            dispatch(category("Bags"));
                          }}
                        >
                          Bags
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem
                          value="clothes"
                          onClick={() => {
                            dispatch(category("Clothes"));
                          }}
                        >
                          Clothes
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem
                          value="mobile-accessories"
                          onClick={() => {
                            dispatch(category("Mobile Accessories"));
                          }}
                        >
                          Mobile Accessories
                        </DropdownMenuRadioItem>
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>

            {/* Search Product Input Field */}
            <div className="flex-grow">
              <div className="flex h-12 items-center gap-3 rounded border py-2 pl-3">
                <Image
                  src="/assets/icons/product-icon.svg"
                  alt="Calendar Icon"
                  width={16}
                  height={16}
                  className="h-[16px] w-[16px]"
                />
                <input
                  type="text"
                  value={accessoriesSearchFormState.product}
                  onChange={(e) => {
                    dispatch(product(e.target.value));
                  }}
                  className="ml-2 w-full flex-grow bg-transparent pr-2 outline-none placeholder:text-[16px]"
                  placeholder="Search Product"
                  autoComplete="off"
                  required
                />
              </div>
            </div>

            {/* Desktop Search Button */}
            <div className="flex h-12 w-full min-w-[110px] items-center justify-center rounded-[4px] bg-darkBlue px-4 py-2 text-[16px] font-[600] text-white sm:w-[10%]">
              <button className={`flex items-center gap-[6px]`}>
                <Image
                  src="/assets/icons/search-icon.svg"
                  alt="Icon for Search Flights"
                  width={14}
                  height={14}
                  className="h-[14px] w-[14px]"
                />
                Search
              </button>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};

export default AccessoriesSearchFormDesktop;

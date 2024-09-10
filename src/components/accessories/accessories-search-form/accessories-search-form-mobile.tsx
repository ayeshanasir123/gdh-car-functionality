import React from "react";
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

const AccessoriesSearchFormMobile = () => {
  const accessoriesSearchFormState = useAppSelector(
    (state: RootState) => state.accessoriesSearchForm,
  );

  const dispatch = useAppDispatch();
  return (
    <form id="accessories-search-form-mobile">
      <div className="mt-10">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Input Field: Choose Category */}
          <div
            id="category-mobile"
            className="sm:col-span-1"
            onClick={() => {}}
          >
            <div className="flex items-center justify-between gap-3 rounded-md border-2 px-3 py-2">
              <Image
                src="/assets/icons/category-icon.svg"
                alt="Category Icon"
                height={16}
                width={16}
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
                    className="flex-grow border-none focus:border-transparent focus:outline-none"
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

          {/* Input Field: Product */}
          <div id="product-mobile" className="sm:col-span-1" onClick={() => {}}>
            <div className="flex items-center justify-between gap-3 rounded-md border-2 px-3 py-2">
              <Image
                src="/assets/icons/calendar-icon.svg"
                alt="Calendar Icon"
                height={16}
                width={16}
                className="h-[16px] w-[16px]"
              />

              <input
                type="text"
                value={accessoriesSearchFormState.product}
                onChange={(e) => {
                  dispatch(product(e.target.value));
                }}
                className="flex-grow border-none focus:border-transparent focus:outline-none"
                placeholder="Search Product"
                autoComplete="off"
                required
              />
            </div>
          </div>
        </div>
      </div>

      {/* Search Cars Button Starts */}
      <button
        type="submit"
        className=" mr-3 mt-12 flex w-full items-center justify-center gap-[10px] rounded-lg bg-darkBlue py-3 text-white"
      >
        <Image
          src={"/assets/icons/search.svg"}
          alt="search"
          width={14}
          height={14}
        />
        Search Accessories
      </button>
      {/* Search Cars Button Ends */}
    </form>
  );
};

export default AccessoriesSearchFormMobile;

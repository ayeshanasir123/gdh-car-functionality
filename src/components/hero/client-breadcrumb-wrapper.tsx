"use client";

import React from "react";
import BreadcrumbsComponent from "./breadcrumbs-component";
import { usePathname } from "next/navigation";

const ClientBreadcrumbWrapper: React.FC = () => {
  const pathname = usePathname();

  const capitalize = (str: string) => {
    return str
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const pathSegments = pathname.split("/").filter((segment) => segment);

  const items = pathSegments.map((segment, index) => {
    const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
    return { title: capitalize(segment), href };
  });

  const currentPage = items.pop()?.title || "";

  return (
    <div className="container mx-auto mt-4 rounded-lg">
      <BreadcrumbsComponent items={items} currentPage={currentPage} />
    </div>
  );
};

export default ClientBreadcrumbWrapper;

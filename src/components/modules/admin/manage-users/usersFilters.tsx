"use client";
import ClearFiltersButton from "@/components/shared/ClearFiltersButton";
import RefreshButton from "@/components/shared/RefreshButton";
import SearchFilter from "@/components/shared/SearchFilter";

function UserFilters() {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3 flex-wrap">
        <SearchFilter paramName="searchTerm" placeholder="Search Users..." />
        <RefreshButton />
        <ClearFiltersButton />
      </div>
    </div>
  );
}

export default UserFilters;

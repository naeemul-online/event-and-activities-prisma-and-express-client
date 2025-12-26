"use client";

import ClearFiltersButton from "@/components/shared/ClearFiltersButton";
import RefreshButton from "@/components/shared/RefreshButton";
import SearchFilter from "@/components/shared/SearchFilter";
import SelectFilter from "@/components/shared/SelectFilter";
import DateFilter from "@/components/ui/DateFilter";
import { ICategory } from "@/types/events.interface";

interface EventsFilterProps {
  categories: ICategory[];
}

const EventFilters = ({ categories }: EventsFilterProps) => {
  return (
    <div className="space-y-3">
      {/* Row 2: Filter Controls - All on same line */}
      <div className="flex items-center gap-3 flex-wrap">
        {/* Category Filter */}
        <SelectFilter
          paramName="categoryId"
          placeholder="Categories"
          options={categories.map((category) => ({
            value: category.id,
            label: category.name,
          }))}
        />

        <DateFilter paramName="startDate" label="Start Date" />
        <DateFilter paramName="endDate" label="End Date" />

        <SearchFilter paramName="location" placeholder="Search by location" />

        {/* Clear All Filters */}
        <div className="flex items-center gap-3">
          <SearchFilter paramName="searchTerm" placeholder="Search Events..." />
          <RefreshButton />
        </div>

        <ClearFiltersButton />
      </div>
    </div>
  );
};

export default EventFilters;

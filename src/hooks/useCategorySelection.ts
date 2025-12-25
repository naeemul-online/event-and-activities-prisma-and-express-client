import { ICategory, IEvents } from "@/types/events.interface";
import { useEffect, useState } from "react";

interface EventsSelectionProps {
  events?: IEvents[];
  isEdit: boolean;
  open: boolean;
}

interface UseEventSelectionReturn {
  selectedCategoryIds: string[];
  removedCategoryIds: string[];
  currentCategoryId: string;
  setCurrentCategoryId: (id: string) => void;
  handleAddCategory: () => void;
  handleRemoveCategory: (id: string) => void;
  getNewCategories: () => string[];
  getAvailableCategories: (allCategories: ICategory[]) => ICategory[];
}

export const useCategorySelection = ({
  events,
  isEdit,
  open,
}: EventsSelectionProps): UseEventSelectionReturn => {
  const getInitialCategoryIds = () => {
    if (isEdit && events?.category) {
      return (
        events.category
          .map((ec: ICategory) => {
            // Try: specialitiesId, specialities.id, or specialties.id
            return ec?.id || null;
          })
          ?.filter((id): id is string => !!id) || []
      );
    }
    return [];
  };

  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>(
    getInitialCategoryIds
  );

  const [removedCategoryIds, setRemovedCategoryIds] = useState<string[]>([]);
  const [currentCategoryId, setCurrentCategoryId] = useState<string>("");

  const handleAddCategory = () => {
    if (currentCategoryId && !selectedCategoryIds.includes(currentCategoryId)) {
      setSelectedCategoryIds([...selectedCategoryIds, currentCategoryId]);
      // If in edit mode and we're re-adding a removed category
      if (removedCategoryIds.includes(currentCategoryId)) {
        setRemovedCategoryIds(
          removedCategoryIds.filter((id) => id !== currentCategoryId)
        );
      }
      setCurrentCategoryId("");
    }
  };

  const handleRemoveCategory = (categoryId: string) => {
    setSelectedCategoryIds(
      selectedCategoryIds.filter((id) => id !== categoryId)
    );

    // In edit mode, track removed specialties
    if (isEdit && events?.eventCategories) {
      const wasOriginalCategory = event?.eventCategories?.some((ds) => {
        const id = ds?.categoriesId || null;
        return id === categoryId;
      });
      if (wasOriginalCategory && !removedCategoryIds.includes(categoryId)) {
        setRemovedCategoryIds([...removedCategoryIds, categoryId]);
      }
    }
  };

  const getNewCategories = (): string[] => {
    if (!isEdit || !events?.eventCategories) {
      return selectedCategoryIds;
    }
    const originalIds =
      events?.eventCategories
        ?.map((ds) => ds?.specialitiesId || null)
        ?.filter((id): id is string => !!id) || [];
    return selectedCategoryIds.filter((id) => !originalIds.includes(id));
  };

  const getAvailableCategories = (allCategories: ICategory[]) => {
    return (
      allCategories?.filter((s) => !selectedCategoryIds?.includes(s?.id)) || []
    );
  };

  useEffect(() => {
    if (open && event) {
      const initialIds = getInitialCategoryIds();
      setSelectedCategoryIds(initialIds);
      setRemovedCategoryIds([]);
      setCurrentCategoryId("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, events?.id]);

  return {
    selectedCategoryIds,
    removedCategoryIds,
    currentCategoryId,
    setCurrentCategoryId,
    handleAddCategory,
    handleRemoveCategory,
    getNewCategories,
    getAvailableCategories,
  };
};

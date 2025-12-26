"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { Input } from "../ui/input";

interface DateFilterProps {
  paramName: string;
  label: string;
}

const DateFilter = ({ paramName, label }: DateFilterProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const value = searchParams.get(paramName) || "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams.toString());

    if (e.target.value) {
      params.set(paramName, e.target.value);
      params.set("page", "1");
    } else {
      params.delete(paramName);
      params.delete("page");
    }

    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  };

  return (
    <div className="">
      <label className="text-xs text-muted-foreground mr-4">{label}</label>
      <Input
        type="date"
        value={value}
        onChange={handleChange}
        disabled={isPending}
        className="w-[160px]"
      />
    </div>
  );
};

export default DateFilter;

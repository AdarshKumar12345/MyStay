import { CircleMinus, CirclePlus } from "lucide-react";
import { useCallback } from "react";


export default function CounterInfo({ value, onChange } ) {
  const onAdd = useCallback(() => {
    onChange(value + 1);
  }, [onChange, value]);

  const onRemove = useCallback(() => {
    if (value === 0) return;
    onChange(value - 1);
  }, [onChange, value]);

  return (
    <div className="flex items-center justify-between w-full max-w-xs p-4 bg-gray-100 rounded-md shadow-sm">

      <button
        onClick={onRemove}
        className="flex items-center gap-2 hover:text-red-600 transition disabled:opacity-50"
        aria-label="Decrease"
        disabled={value === 0}
      >
        <CircleMinus className="h-8 w-8 text-gray-600" />
      </button> 
      <span className="text-gray-800 font-semibold text-xl">{value}</span>
      <button
        onClick={onAdd}
        className="flex items-center gap-2 hover:text-blue-600 transition"
        aria-label="Increase"
      >
        <CirclePlus className="h-8 w-8 text-gray-600" />
      </button>


    </div>
  );
}

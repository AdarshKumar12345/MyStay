import { Suspense } from "react";
import CategoryHandlerContent from "./CategoryHandlerContent";

export default function CategoryHandler() {
  return (
    <Suspense fallback={<div>Loading categories...</div>}>
      <CategoryHandlerContent />
    </Suspense>
  );
}
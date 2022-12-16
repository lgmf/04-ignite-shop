import { useAtomsDevtools } from "jotai/devtools";

export function StoreDevtools() {
  useAtomsDevtools("ignite-shop");
  return null;
}

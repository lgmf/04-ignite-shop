import { QueryClient } from "@tanstack/query-core";
import { Atom, Provider as JotaiProvider } from "jotai";
import { queryClientAtom } from "jotai-tanstack-query";
import { ReactNode } from "react";

interface ProviderProps {
  queryClient: QueryClient;
  children: ReactNode;
}

type InitialValues = (readonly [Atom<unknown>, unknown])[];

function createInitialValues() {
  const initialValues: InitialValues = [];

  return {
    get() {
      return initialValues;
    },
    set<Value>(anAtom: Atom<Value>, value: Value) {
      initialValues.push([anAtom, value]);
    },
  };
}

export function Provider({ queryClient, children }: ProviderProps) {
  const initialValues = createInitialValues();
  initialValues.set(queryClientAtom, queryClient);

  return (
    <JotaiProvider initialValues={initialValues.get()}>
      {children}
    </JotaiProvider>
  );
}

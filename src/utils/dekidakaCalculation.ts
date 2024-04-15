import { useAllStateContext } from "@/context/allStateContext";

export const calculateDeviasi = (
  plan: number | null | undefined,
  actual: number | null | undefined
): number | null | undefined => {
  if (plan === null || actual === null) {
    return null;
  }

  if (plan !== undefined && actual !== undefined) {
    return actual - plan;
  }

  return undefined;
};

export const calculateLossTime = (
  subDekidaka: any,
  plan: number | null | undefined,
  actual: number | null | undefined
): number | null | undefined => {
  if (plan === null || actual === null) {
    return null;
  }

  if (subDekidaka && plan !== undefined && actual !== undefined) {
    const tableRowCount = subDekidaka.length;
    let lossTime = 0;
    let lossTimeRatio;

    if (tableRowCount === 3 || tableRowCount === 7) {
      lossTimeRatio = 55 / plan;
    } else {
      lossTimeRatio = 60 / plan;
    }

    lossTime = Math.round((plan - actual) * lossTimeRatio);
    return lossTime;
  }
  return undefined;
};

export const useLossTimeCalculation = () => {
  const { tableIndex: contextTableIndex } = useAllStateContext();

  const calculateLossTimeById = (
    subDekidaka: any,
    plan: number | null | undefined,
    actual: number | null | undefined,
    tableIndex: number
  ): number | null | undefined => {
    if (plan === null || actual === null) {
      return null;
    }

    let lossTime = 0;

    if (
      subDekidaka &&
      plan !== undefined &&
      actual !== undefined &&
      contextTableIndex !== undefined
    ) {
      const currentTableIndex =
        tableIndex !== undefined ? tableIndex : contextTableIndex;
      if (currentTableIndex === 3 || currentTableIndex === 7) {
        lossTime = Math.round((plan - actual) * (55 / plan));
      } else {
        lossTime = Math.round((plan - actual) * (60 / plan));
      }
    }

    return lossTime;
  };
  return { calculateLossTimeById };
};

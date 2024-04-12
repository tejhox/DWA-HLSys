import { useAllStateContext } from "@/context/allStateContext";

export const calculateDeviasi = (
  plan: number | undefined,
  actual: number | undefined
): number => {
  let deviasi = 0;
  if (plan !== undefined && actual !== undefined) {
    deviasi = actual - plan;
  }
  return deviasi;
};

export const calculateLossTime = (
  subDekidaka: any,
  plan: number | undefined,
  actual: number | undefined
): number => {
  let lossTime = 0;

  if (subDekidaka && plan !== undefined && actual !== undefined) {
    const tableRowCount = subDekidaka.length;
    let lossTimeRatio;
    if (tableRowCount === 3 || tableRowCount === 7) {
      lossTimeRatio = 55 / plan;
    } else {
      lossTimeRatio = 60 / plan;
    }
    lossTime = Math.round((plan - actual) * lossTimeRatio);
  }
  return lossTime;
};

export const useLossTimeCalculation = () => {
  const { tableIndex: contextTableIndex } = useAllStateContext();

  const calculateLossTimeById = (
    subDekidaka: any,
    plan: number | undefined,
    actual: number | undefined,
    tableIndex: number
  ): number | undefined => {
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

const convertCamelCaseToUpperCaseUnderScore = (str: string): string =>
  str
    .split(/(?=[A-Z])/)
    .join("_")
    .toUpperCase();

const convertUpperCaseUnderScoreToCamelCase = (str: string): string => {
  str = str.toLowerCase();
  return str.replace(/([-_][a-z])/gi, ($1) => {
    return $1.toUpperCase().replace("-", "").replace("_", "");
  });
};

const convertToCamelCase = (str: string): string => {
  str = str.toLowerCase();
  return str.replace(/([-_\s][a-z])/gi, ($1) => {
    return $1.toUpperCase().replace("-", "").replace("_", "").replace(" ", "");
  });
};
const isNumber = (val: any) => /^[0-9]+$/.test(val);

const convertCurrency = (num = 0, currency?: string) => {
  if (Number.isNaN(Number(num)))
    return {
      price: 0,
      unit: "",
    };
  const numStr = num?.toString().split(".");

  const int = numStr[0];
  const decimal = numStr[1] ? `.${numStr[1]}` : "";

  // In case currency is Vietnamdong
  if (currency === "VND" && num > 0) {
    return {
      price: (+int.substr(0, int.length - 3))?.toLocaleString(),
      unit: `${int.substr(-3)}${decimal}`,
    };
  }

  if (currency === "VND" && num === 0) {
    return {
      price: "0",
      unit: "",
    };
  }

  // In case others currency
  if (currency !== "VND" && int.toString().length > 3) {
    return {
      price: (+int)?.toLocaleString(),
      unit: decimal,
    };
  }

  if (currency !== "VND" && int.toString().length <= 3) {
    return {
      price: num?.toLocaleString(),
      unit: "",
    };
  }

  return {
    price: 0,
    unit: "",
  };
};

"use client";

import { useEffect, useState } from "react";
import { Loader } from "@/components/currency-conversion/Loader";

interface ConvertCurrencyResponseData {
  convertedAmount: number;
  status: number;
}

interface CurrencyRateResponseData {
  exchangeRate: number;
  status: number;
}

type ResponseStates = "idle" | "loading" | "error" | "success";

export const Form = () => {
  const [amount, setAmount] = useState<number>(0);
  const [requestState, setRequestState] = useState<ResponseStates>("idle");
  const [convertedAmount, setConvertedAmount] = useState<number>(0);
  const [exchangeRate, setExchangeRate] = useState<number>(0);

  useEffect(() => {
    if (!exchangeRate) {
      fetchExchangeRate();
    }
  }, []);

  const fetchExchangeRate = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/currency-conversion/rate`,
        {
          method: "GET",
        },
      );

      const data: CurrencyRateResponseData = await response.json();

      setExchangeRate(data.exchangeRate);
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  };

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setRequestState("loading");

    const params = new URLSearchParams();
    params.append("amount", amount.toString());

    try {
      const response = await fetch(
        `http://localhost:4000/currency-conversion?${params.toString()}`,
        {
          method: "GET",
        },
      );

      const data: ConvertCurrencyResponseData = await response.json();

      setConvertedAmount(data.convertedAmount);
      setRequestState("success");
    } catch (error) {
      console.error("Error:", error);
      setRequestState("error");
      return null;
    }
  };

  return (
    <>
      <form onSubmit={handleOnSubmit} className={"flex flex-wrap w-[300px]"}>
        <label htmlFor="amount" className={"w-full font-bold"}>
          Amount in EUR (1 EUR ~ {exchangeRate} PLN)
        </label>
        <input
          className={"w-full border rounded py-1 px-2"}
          name={"amount"}
          id={"amount"}
          type={"number"}
          placeholder={"10"}
          min={0}
          step={"any"}
          onChange={(e) => setAmount(Number(e.target.value))}
        ></input>
        <button
          type="submit"
          disabled={!amount}
          className={
            "disabled:bg-gray-200 bg-black rounded-md w-full text-white my-4 py-1 px-2 cursor-pointer flex flex justify-center"
          }
        >
          {requestState !== "loading" ? "Convert to PLN" : <Loader />}
        </button>
        {requestState === "error" && (
          <p className={"text-red-500 text-sm my-2"}>
            There was an error while converting currency. Try again later.
          </p>
        )}
        {convertedAmount > 0 && (
          <p className={"w-full"}>
            Converted amount:{" "}
            <span className={"font-semibold"}>{convertedAmount} PLN</span>
          </p>
        )}
      </form>
    </>
  );
};

"use client";

import { currencyData } from "@/lib/constants/currenciesList";
import React, { useState } from "react";

const page = () => {
  const [currency, setCurrency] = useState("");
  const [budget, setBudget] = useState("");

  let obj = { currency: currency, budget: budget };
  console.log(JSON.stringify(obj));

  console.log(JSON.parse(JSON.stringify(obj)));
  return (
    <div>
      <div>Currency List</div>
      <div>
        <div className="mb-4 w-2/4">
          <label className="block text-sm font-medium text-gray-700">
            Budget
          </label>
          <div className="flex gap-2">
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="mt-1 block p-2 border border-gray-300 rounded w-1/4"
              required
            >
              <option value="">Select a currency</option>
              {currencyData.map((cd) => (
                <option key={cd.symbol}>{cd.symbol}</option>
              ))}
            </select>
            <input
              type="number"
              // only write numbers
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </div>
      </div>
      <div>{`This is the: ${budget} and ${currency}`}</div>
      <div>{`New val: ${budget} ${currency}`}</div>
    </div>
  );
};

export default page;

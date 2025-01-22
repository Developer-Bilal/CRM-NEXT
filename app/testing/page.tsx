"use client";

import { FormEvent, useState } from "react";

type Milestones = {
  [key: string]: boolean;
};

const Testing = () => {
  const [milestones, setMilestones] = useState<Milestones>({
    m1: false,
    m2: true,
    m3: false,
  });

  const [addMilestone, setAddMilestone] = useState("");
  const [percentage, setPercentage] = useState(0);

  // Object.keys(milestones).map((val, index) => {
  //   console.log(val);
  // });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Submitted");
  };

  // change event
  const handleChange = (milestone: string) => {
    //  setMilestones(prev => {...prev, })
    //***
    setMilestones((prev) => ({
      ...prev,
      [milestone]: !prev[milestone],
    }));

    const total = milestones.length;

    console.log(total);
  };

  return (
    <div className="p-10">
      <h1>Milestones</h1>
      <form onSubmit={handleSubmit} className="py-4">
        <input
          type="text"
          value={addMilestone}
          onChange={(e) => setAddMilestone(e.target.value)}
          className="p-2 border-black border"
        />
        <button
          type="submit"
          className="px-4 py-2 mx-2 bg-blue-400 border-black border"
        >
          Add
        </button>
      </form>
      <ul className="flex flex-col gap-2 items-start">
        {Object.keys(milestones).map((milestone) => (
          <li key={milestone} className="flex gap-2">
            <input
              type="checkbox"
              checked={milestones[milestone]}
              onChange={() => handleChange(milestone)}
            />
            <div>{milestone}</div>
          </li>
        ))}
        <li className="flex gap-2">
          <input type="checkbox" />
          <div>Test</div>
        </li>
      </ul>
      <h3>Percentage: {percentage}</h3>
    </div>
  );
};

export default Testing;

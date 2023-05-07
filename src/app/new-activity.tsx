'use client';

import { FormEvent, useState } from 'react';
import { CirclePicker } from 'react-color';

interface Colour {
  hsl: {
    h: number;
    s: number;
    l: number;
    a: number;
  };
  hex: string;
  rgb: {
    r: number;
    g: number;
    b: number;
    a: number;
  };
  hsv: {
    h: number;
    s: number;
    v: number;
    a: number;
  };
  oldHue: number;
  source: string;
}

export default function NewActivityType() {
  const [selectedColour, setSelectedColour] = useState<Colour | undefined>(
    undefined
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, emoji } = Object.fromEntries(new FormData(e.currentTarget));
    const res = await fetch('/api/activities', {
      method: 'post',
      body: JSON.stringify({ name, colour: selectedColour?.hex, emoji }),
    });
    console.log({ res });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="text-lg font-semibold">Create an Activity</h3>
      <div className="flex flex-col py-3 max-w-sm">
        <div className="flex space-x-2">
          <input
            placeholder="Name"
            className="border rounded-md p-1 w-32 text-sm"
            name="name"
          />

          <input
            placeholder="Emoji"
            className="border rounded-md p-1 w-32 text-sm"
            name="emoji"
          />
        </div>
        <div className="my-3 space-y-2">
          <label htmlFor="colour">Colour</label>
          <CirclePicker onChangeComplete={setSelectedColour as any} />
        </div>

        <button
          className="p-1 rounded-md px-3 bg-blue-500 text-gray-200 text-sm w-32"
          type="submit"
        >
          Create
        </button>
      </div>
    </form>
  );
}

import React from "react";

export default function ProductDescription() {
  return (
    <>
      <h2 className="text-lg text-center font-semibold mb-3">Description</h2>
      <p className="text-gray-600 text-sm leading-relaxed mb-6">
        Embodying the raw, wayward spirit of rock ‘n’ roll, the Kilburn portable stereo speaker
        takes the unmistakable look and sound of Marshall, unplugs the chords, and takes the show on
        the road.
        <br />
        <br />
        Weighing in under 7 pounds, the Kilburn is a lightweight piece of vintage-styled
        engineering. Setting the bar as one of the loudest speakers in its class.
      </p>

      <div className="grid grid-cols-2 gap-6 mb-12">
        <img
          src="https://picsum.photos/1000/400?random=10"
          className="w-full h-48 object-cover rounded-md transition-transform duration-300 hover:scale-105"
        />
        <img
          src="https://picsum.photos/1000/400?random=11"
          className="w-full h-48 object-cover rounded-md transition-transform duration-300 hover:scale-105"
        />
      </div>
    </>
  );
}

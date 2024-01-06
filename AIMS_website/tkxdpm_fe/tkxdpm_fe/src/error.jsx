"use client";

export default function Error({ error, reset, haveResetButton = false }) {
  return (
    <div>
      {/* <h2 className="mx-auto my-auto p-2 bg-red-500 text-white rounded-md hover:cursor-pointer hover:bg-red-600">
        
      </h2> */}
      {haveResetButton ? (
        <button className="" onClick={() => reset()}>
          Try again
        </button>
      ) : (
        ""
      )}
    </div>
  );
}

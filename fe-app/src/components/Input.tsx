import { forwardRef } from "react";
import { Kecamatan } from "../types";

type InputProps = React.ComponentPropsWithoutRef<"input"> & {
  loading: boolean;
  onClear?: () => void;
  data: null | Kecamatan[];
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ loading, onClear, data, ...restProps }, ref) => {
    return (
      <div className="flex border-2 border-gray-700 rounded-lg p-2 mt-2 focus-within:border-blue-500">
        <input
          ref={ref}
          className="flex-1 focus:ring-0 focus:outline-none"
          placeholder="Nama kecamatan/kota/provinsi . . ."
          type="text"
          {...restProps}
        />
        {loading && (
          <div className="shrink-0 h-6 w-6 animate-spin rounded-full border-4 border-solid border-t-transparent" />
        )}
        {data !== null && data.length > 0 && !loading && (
          <div
            className="shrink-0 h-6 w-6 cursor-pointer relative"
            onClick={() => {
              onClear?.();
            }}
          >
            <div className="absolute top-1/2 left-1/2 w-full h-[4px] bg-black rotate-45 -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute top-1/2 left-1/2 w-full h-[4px] bg-black -rotate-45 -translate-x-1/2 -translate-y-1/2"></div>
          </div>
        )}
      </div>
    );
  }
);

export default Input;

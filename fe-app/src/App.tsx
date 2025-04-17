import { useRef, useState } from "react";
import Districts from "./components/Districts";
import { Kecamatan } from "./types";
import Input from "./components/Input";
import { putDistrict } from "./storage";
import SelectedDistrict from "./components/SelectedDistrict";

function App() {
  const timeoutIdRef = useRef<number | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [data, setData] = useState<null | Kecamatan[]>(null);
  const [search, setSearch] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState<null | Kecamatan>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [focusingInput, setFocusingInput] = useState(false);
  const [hoveringDistricts, setHoveringDistricts] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value.length === 0) {
      setData(null);
      setSearch("");
      return;
    }

    setLoading(true);
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }

    // Debounce the API call
    timeoutIdRef.current = setTimeout(() => {
      fetch(`http://localhost:8000/api/locations?search=${value}`)
        .then((res) => res.json())
        .then((data: Kecamatan[]) => {
          setData(data);
          setSearch(value);
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }, 300);
  };

  const handleClickDistrict = (district: Kecamatan) => {
    // Save a district to list of district in local storage
    putDistrict(district);

    setSelectedDistrict(district);
    if (inputRef.current) {
      inputRef.current.value = district.kecamatan;
    }
    setFocusingInput(false);
    setData(null);
  };

  const resetState = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    setData(null);
    setSearch("");
    setHoveringDistricts(false);
    setFocusingInput(false);
    setLoading(false);
    setSelectedDistrict(null);
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full p-4 border-b-[1px] border-gray-200 overflow-hidden bg-white">
        <h1 className="text-2xl font-bold">Aplikasi Pencarian Kecamatan</h1>
      </header>
      <div className="mt-[65px]">
        <div className="container mx-auto max-w-5xl max-[550px]:w-[calc(100%-48px)] w-full">
          <div className="pt-4 flex flex-col gap-2 items-center">
            <h2 className="text-xl text-center">
              Masukkan nama lokasi yang ada di Indonesia dan pilih salah satu!
            </h2>

            <div className="w-full max-w-md">
              <Input
                selectedDistrict={selectedDistrict}
                ref={inputRef}
                loading={loading}
                onChange={handleChange}
                onClear={resetState}
                onFocus={() => {
                  setFocusingInput(true);
                }}
                onBlur={() => {
                  if (hoveringDistricts && data && data.length > 0) return;
                  setFocusingInput(false);
                  if (selectedDistrict && inputRef.current) {
                    inputRef.current.value = selectedDistrict.kecamatan;
                  }
                }}
              />

              <div className="relative mt-4">
                {data !== null && focusingInput && (
                  <div className="absolute top-0 left-0 w-full bg-white">
                    <Districts
                      data={data}
                      search={search}
                      onClickDistrict={handleClickDistrict}
                      onPointerEnter={() => {
                        setHoveringDistricts(true);
                      }}
                      onPointerLeave={() => {
                        setHoveringDistricts(false);
                      }}
                    />
                  </div>
                )}
                {selectedDistrict !== null && (
                  <SelectedDistrict district={selectedDistrict} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="fixed bottom-0 left-0 w-full p-4 border-t-[1px] border-gray-200 bg-white">
        <div className="flex justify-center">
          <p className="font-bold">
            Dibuat dengan ❤️ oleh&nbsp;
            <a target="_blank" href="https://github.com/irawanfirmansyah">
              Irawan F.
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;

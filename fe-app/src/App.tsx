import { useRef, useState } from "react";
import Districts from "./components/Districts";
import { GetKecamatanResponse, Kecamatan } from "./types";
import Input from "./components/Input";
import { putDistrict } from "./storage";
import SelectedDistrict from "./components/SelectedDistrict";

function App() {
  const timeoutIdRef = useRef<number | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [data, setData] = useState<null | GetKecamatanResponse>(null);
  const [search, setSearch] = useState("");

  const [selectedDistrict, setSelectedDistrict] = useState<null | Kecamatan>(
    null
  );

  const [loading, setLoading] = useState(false);

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
        .then((data: GetKecamatanResponse) => {
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

    resetInput();
  };

  const resetInput = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    setData(null);
    setSearch("");
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
                ref={inputRef}
                data={data?.data ?? null}
                loading={loading}
                onChange={handleChange}
                onClear={resetInput}
              />

              {selectedDistrict !== null && (
                <SelectedDistrict
                  district={selectedDistrict}
                />
              )}

              {data !== null && (
                <Districts
                  data={data.data}
                  search={search}
                  onClickDistrict={handleClickDistrict}
                />
              )}
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

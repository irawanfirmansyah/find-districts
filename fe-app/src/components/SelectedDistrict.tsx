import { Kecamatan } from "../types";

const SelectedDistrict = ({ district }: { district: Kecamatan }) => {
  return (
    <div className="mt-4">
      <h3 className="text-lg mb-2">Kecamatan dipilih</h3>
      <p><span className="font-semibold">Kecamatan:</span> {district.kecamatan}</p>
      <p><span className="font-semibold">Kota:</span> {district.kota}</p>
      <p><span className="font-semibold">Provinsi:</span> {district.provinsi}</p>
    </div>
  );
};

export default SelectedDistrict;

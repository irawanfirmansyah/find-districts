import List from "rc-virtual-list";
import { Kecamatan } from "../types";
import HighlightedText from "./HighlightedText";

const Districts = ({ data, search }: { data: Kecamatan[]; search: string }) => {
  if (data.length === 0) {
    return (
      <div className="mt-4 text-center">
        Tidak ditemukan lokasi yang relevan.
      </div>
    );
  }
  return (
    <List
      component="ul"
      className="rounded-lg border-2 border-gray-700 mt-4 overflow-hidden"
      data={data}
      height={400}
      itemHeight={88}
      itemKey="id"
    >
      {(item, index) => (
        <ListItem id={item.id} key={index} item={item} search={search} />
      )}
    </List>
  );
};

const ListItem = ({
  id,
  search,
  item,
}: {
  id: string | number;
  search: string;
  item: Kecamatan;
}) => {
  return (
    <li key={id} className="hover:bg-gray-100">
      <button type="button" className="w-full p-2 cursor-pointer">
        <div className="text-left">
          <p className="font-normal">
            Kecamatan:{" "}
            <HighlightedText highlight={search} text={item.kecamatan} />
          </p>
          <p className="font-normal">
            Kota: <HighlightedText highlight={search} text={item.kota} />
          </p>
          <p className="font-normal">
            Provinsi:{" "}
            <HighlightedText highlight={search} text={item.provinsi} />
          </p>
        </div>
      </button>
    </li>
  );
};

export default Districts;

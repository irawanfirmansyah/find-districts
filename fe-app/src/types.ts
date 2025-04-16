export type Kecamatan = {
  id: number;
  kecamatan: string;
  kota: string;
  provinsi: string;
};

export type GetKecamatanResponse = {
  data: Kecamatan[];
  length: number;
};

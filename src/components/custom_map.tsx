"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L, { LatLngExpression } from "leaflet";
import ItemTitle from "@/components/tools/Item_title";
import CustomSelect from "@/components/tools/custom_select";

import "leaflet/dist/leaflet.css";

interface Location {
  name: string;
  coords: [number, number];
}

// 設定地圖的初始設定
const position: number[] = [25.047735, 121.577671];
const zoom = 16;
const attribution = "來源：國土測繪中心";
const tileLayerUrl =
  "https://wmts.nlsc.gov.tw/wmts/EMAP16/default/GoogleMapsCompatible/{z}/{y}/{x}";

const customIcon = L.icon({
  iconUrl: "/icons/deco.png",
  iconSize: [38, 38], // 圖片大小 [寬度, 高度]
  iconAnchor: [19, 38], // 圖片錨點，[x, y]
  popupAnchor: [0, -38], // 彈出視窗的錨點，[x, y]
});

const fixedLocations: Location[] = [
  { name: "鼎漢-台北總公司", coords: [25.047735, 121.577671] },
  { name: "鼎漢-松二辦公室", coords: [25.047448, 121.577644] },
  { name: "鼎漢-台中分公司", coords: [24.162379, 120.669245] },
  { name: "鼎漢-台南分公司", coords: [22.996921, 120.172551] },
  { name: "鼎漢-高雄分公司", coords: [22.642038, 120.303074] },
];

// 地圖定位移動元件
function MapMover({ position }: { position: LatLngExpression }) {
  const map = useMap();
  useEffect(() => {
    if (map) {
      map.flyTo(position, zoom);
    }
  }, [map, position]);
  return null;
}

export default function MapComponent() {
  const [choosedSelect, setChoosedSelect] = React.useState(0); // 選單目前選項
  const [centerPOI, setCenterPOI] = React.useState<number[] | null[]>(position); // 地圖中心位置
  const target = fixedLocations[choosedSelect].coords;

  return (
    <>
      <ItemTitle typeName="map" />
      <div className="map_wrapper relative h-full flex flex-col gap-4 w-full p-4">
        <div className="absolute top-[35px] left-[70px] z-10 flex flex-row gap-2">
          <CustomSelect
            items={fixedLocations}
            setSelectedFunction={setChoosedSelect}
          />
          <button
            className="px-2 py-1 bg-blue-500 text-white rounded text-xs"
            onClick={() => setCenterPOI(target)}
          >
            <Image src="/icons/locate.png" alt="" width={24} height={24} />
          </button>
        </div>

        <MapContainer
          className="rounded-lg h-full w-full z-0"
          center={target as LatLngExpression}
          zoom={zoom}
        >
          <TileLayer attribution={attribution} url={tileLayerUrl} />

          <Marker position={target as LatLngExpression} icon={customIcon}>
            <Popup>鼎漢國際顧問股份有限公司</Popup>
          </Marker>
          <MapMover position={centerPOI as LatLngExpression} />
        </MapContainer>
      </div>
    </>
  );
}

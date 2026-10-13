export type Property = {
  id: string;
  slug: string;
  name: string;
  location: string;
  price: number;
  priceSuffix?: string;
  type: "House" | "Apartment" | "Villa" | "Penthouse";
  listing: "En venta" | "En alquiler";
  beds: string;
  baths: string;
  area: string;
  image: string;
  label?: string;
  latitude?: number;
  longitude?: number;
  images?: PropertyImage[];
};

export type PropertyImage = {
  id?: number;
  url: string;
  alt: string;
  sortOrder: number;
  isPrimary: boolean;
};

export function formatPrice(price: number) {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(price);
}

export const featuredProperties: Property[] = [
  {
    id: "glass-pavilion",
    slug: "glass-pavilion",
    name: "Pabellón de Cristal",
    location: "Lo Barnechea, Santiago",
    price: 4830000000,
    type: "Villa",
    listing: "En venta",
    beds: "5 habitaciones",
    baths: "4.5 baños",
    area: "4,200 m²",
    label: "Exclusiva",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCra-FKp81t0_OM8bWD55m2o9OOSnR_v7D0UilyExMImxyIcr9tIMZ2Py3HcC0ra_MtSsBkduMcwxUNKI9_iSXFFr_YRON1SF9hNM3fcYy-uG7N7uusL0Z367WINi1V7_GwfNQx-gsbUqLtzVi4ivFyqFQGb4qBs79bALeSFb6i3_ZnJnI1VVrN-VeZYHjfYyQI5C6zy90N3uxWZpwzIBhNoUDKKQjQ8EOEYPoyPTzhnh6b6AS3dkkFJ8t4xSDC6qjhMrQUoUPnAeM",
  },
  {
    id: "azure-heights",
    slug: "azure-heights",
    name: "Ático Alturas del Pacífico",
    location: "Vitacura, Santiago",
    price: 3496000000,
    type: "Penthouse",
    listing: "En venta",
    beds: "3 habitaciones",
    baths: "3 baños",
    area: "2,100 m²",
    label: "Recién llegada",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDurAGHzg_fpQxFal-obkFVy1Q3WLPdueAQpz0itcQiRV-WfvulnBEDJbNeV8J06q4mX7PTtXYVJjX4-mHVr_khZLZxQ_s8f6fruGqzeqALyMu8wEHRK1EsOs9f4_jPmS7FxcdzrDkR88Wz0GjaPLXkTZRoJQfur59rxYRLi-WYcW-VU_gKS39CPLOMlftvqGvW0IOk5tXgst5mJ4WQM-ICN4vkdel9ido9YFUQga0OI10i6NSe5W4owt33-2YRi_b_ltdZW2QZC5s",
  },
];

export const newProperties: Property[] = [
  {
    id: "urban-loft",
    slug: "urban-loft",
    name: "Loft Urbano",
    location: "Avenida Providencia 456, Santiago",
    price: 2944000,
    priceSuffix: " al mes",
    type: "Apartment",
    listing: "En alquiler",
    beds: "1",
    baths: "1",
    area: "85m²",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDuQ9M7U6euA6_cXmYuXnej-N5IuawAW8ds-4G1mzfqmiBc13qXsPhf9_j_zTB8gfEunrBHo8xMsxYwCw_pl8fsxbxRkmyvLR1N9Tiye5ZJG7fwlLn9MwyBanXYhE0emGwp59es1FEyQTRQbmXLUKO74Yj34ZHqrqIkOtMKhP8CmRFvfoHT5LAe10105vUhKNkxIBvtt530nfLigSUTemOOcJMVNmsgactntRJUwOBU_TZzND7BYtDklr8uZcNYlQOK5U74-ufIf-E",
  },
  {
    id: "highland-retreat",
    slug: "highland-retreat",
    name: "Refugio de Montaña",
    location: "Camino Farellones 789, Lo Barnechea",
    price: 570400000,
    type: "House",
    listing: "En venta",
    beds: "2",
    baths: "2",
    area: "98m²",
    image:
      "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "sea-view-penthouse",
    slug: "sea-view-penthouse",
    name: "Ático Vista al Mar",
    location: "Avenida del Mar 321, Viña del Mar",
    price: 4140000,
    priceSuffix: " al mes",
    type: "Penthouse",
    listing: "En alquiler",
    beds: "3",
    baths: "3",
    area: "180m²",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBGq4Phm0uDzCnjHAsnWpYTBVpOds_M6iOsJuRQQA5eUZHkztGgtc7eh_OE6wBeyW1-iZh7yyhROnvvmqkAZ9tyAWFGXk0FG52zU4kZ_EDLA0U0cRszy7byNXTeWe0_hS53SYmtCTEV8Y1AM-WxiIC38UMa15QwFDjXtCGQOxoh35K0Ol_70vfsxm0VqDbaWkr8tcEbLTLy0NXH_GcpGK4lAXizgxYOIlFWGyau-4OIfPZRpjCBDbz_qu3VlN201UUJGiuM9ajVd-U",
  },
  {
    id: "central-studio",
    slug: "central-studio",
    name: "Estudio Central",
    location: "Avenida Central 555, Santiago",
    price: 506000000,
    type: "Apartment",
    listing: "En venta",
    beds: "1",
    baths: "1",
    area: "50m²",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA1w-Hb1289NqZKon3VK8bpmMiCDYYiAMT5egzTINo9m9wSZRHv-k-1IGTVoL1NT8YeZXJHa87JPNDIPrtrbP7jChHq0ypXF90uByhC6VA9O788_B4FY8JVg4chbWN9bcrn9-9FvVvfZX8Aj60Iqg_C8CsCA9DEnJqi2rJvzmK5UP5z-9XRTRjBneAPCa8iGgGWBD9yYKsziN6vn0ePBDGo3inieQtmbr46W31p6UfQ649XRxTm7ygOY2J-jxW1r0qWs8i97KGpkTE",
  },
  {
    id: "casa-los-aromos",
    slug: "casa-los-aromos",
    name: "Casa Los Aromos",
    location: "Camino El Arrayán 1240, Lo Barnechea",
    price: 792000000,
    type: "House",
    listing: "En venta",
    beds: "4",
    baths: "3",
    area: "240m²",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "departamento-lastarria",
    slug: "departamento-lastarria",
    name: "Departamento Lastarria",
    location: "José Victorino Lastarria 85, Santiago",
    price: 2380000,
    priceSuffix: " al mes",
    type: "Apartment",
    listing: "En alquiler",
    beds: "2",
    baths: "2",
    area: "92m²",
    image:
      "https://images.unsplash.com/photo-1502672023488-70e25813eb80?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "villa-costa-brava",
    slug: "villa-costa-brava",
    name: "Villa Costa Brava",
    location: "Avenida Borgoño 1850, Concón",
    price: 1150000000,
    type: "Villa",
    listing: "En venta",
    beds: "5",
    baths: "4",
    area: "380m²",
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "atico-bicentenario",
    slug: "atico-bicentenario",
    name: "Ático Parque Bicentenario",
    location: "Avenida Nueva Costanera 3900, Vitacura",
    price: 4650000,
    priceSuffix: " al mes",
    type: "Penthouse",
    listing: "En alquiler",
    beds: "3",
    baths: "3",
    area: "210m²",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "casa-valle-nevado",
    slug: "casa-valle-nevado",
    name: "Casa Valle Nevado",
    location: "Camino Valle Nevado 650, Farellones",
    price: 680000000,
    type: "House",
    listing: "En venta",
    beds: "3",
    baths: "2",
    area: "165m²",
    image:
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "loft-barrio-italia",
    slug: "loft-barrio-italia",
    name: "Loft Barrio Italia",
    location: "Avenida Italia 1420, Ñuñoa",
    price: 1750000,
    priceSuffix: " al mes",
    type: "Apartment",
    listing: "En alquiler",
    beds: "1",
    baths: "1",
    area: "68m²",
    image:
      "https://images.unsplash.com/photo-1560185008-b033106af5c3?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "casa-jardin-del-mar",
    slug: "casa-jardin-del-mar",
    name: "Casa Jardín del Mar",
    location: "Los Pescadores 740, Viña del Mar",
    price: 924000000,
    type: "House",
    listing: "En venta",
    beds: "4",
    baths: "3",
    area: "280m²",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "villa-lago-ranco",
    slug: "villa-lago-ranco",
    name: "Villa Lago Ranco",
    location: "Ruta T-85, Lago Ranco",
    price: 1350000000,
    type: "Villa",
    listing: "En venta",
    beds: "6",
    baths: "4",
    area: "420m²",
    image:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "departamento-puerto-varas",
    slug: "departamento-puerto-varas",
    name: "Departamento Lago Llanquihue",
    location: "Avenida Vicente Pérez Rosales 980, Puerto Varas",
    price: 2850000,
    priceSuffix: " al mes",
    type: "Apartment",
    listing: "En alquiler",
    beds: "2",
    baths: "2",
    area: "105m²",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: "atico-manquehue",
    slug: "atico-manquehue",
    name: "Ático Vista Manquehue",
    location: "Avenida Manquehue Norte 1120, Las Condes",
    price: 598000000,
    type: "Penthouse",
    listing: "En venta",
    beds: "3",
    baths: "2",
    area: "145m²",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=85",
  },
];

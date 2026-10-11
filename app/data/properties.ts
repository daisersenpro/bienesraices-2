export type Property = {
  id: string;
  name: string;
  location: string;
  price: string;
  priceSuffix?: string;
  type: "House" | "Apartment" | "Villa" | "Penthouse";
  listing: "En venta" | "En alquiler";
  beds: string;
  baths: string;
  area: string;
  image: string;
  label?: string;
};

export const featuredProperties: Property[] = [
  {
    id: "glass-pavilion",
    name: "The Glass Pavilion",
    location: "Beverly Hills, California",
    price: "$5,250,000",
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
    name: "Azure Heights Penthouse",
    location: "Downtown, Vancouver",
    price: "$3,800,000",
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
    name: "Urban Loft",
    location: "456 Elm Ave, Portland",
    price: "$3,200",
    priceSuffix: "/mo",
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
    name: "Highland Retreat",
    location: "789 Mountain Rd, Bend",
    price: "$620,000",
    type: "House",
    listing: "En venta",
    beds: "2",
    baths: "2",
    area: "98m²",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuARQWC19e7mleUpjb8CWLztEv_svJeRFOaC2i-9r9GctFuX5Barzhfai9wNM1WW8bcGlqdFM32d3KPf7SItom5ijdHOz5rGGQPeT7PlWs8-y9LkfcsHLQqsLxalhxP94XJo76_mAMp7T2dVj3hPKHNzTDLLiS6ujSdSsyo3onxQthp4ZkVE8op92gyTLUUucaGaxO8vJvyhH3FuWB07EPqT1WsW0lr9Of5lUPonjG9eiqE1XiJXTqzXUZQt5JorfPwCO1MioZA_Zro",
  },
  {
    id: "sea-view-penthouse",
    name: "Sea View Penthouse",
    location: "321 Ocean Dr, Miami",
    price: "$4,500",
    priceSuffix: "/mo",
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
    name: "Central Studio",
    location: "555 Main St, Chicago",
    price: "$550,000",
    type: "Apartment",
    listing: "En venta",
    beds: "1",
    baths: "1",
    area: "50m²",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA1w-Hb1289NqZKon3VK8bpmMiCDYYiAMT5egzTINo9m9wSZRHv-k-1IGTVoL1NT8YeZXJHa87JPNDIPrtrbP7jChHq0ypXF90uByhC6VA9O788_B4FY8JVg4chbWN9bcrn9-9FvVvfZX8Aj60Iqg_C8CsCA9DEnJqi2rJvzmK5UP5z-9XRTRjBneAPCa8iGgGWBD9yYKsziN6vn0ePBDGo3inieQtmbr46W31p6UfQ649XRxTm7ygOY2J-jxW1r0qWs8i97KGpkTE",
  },
];

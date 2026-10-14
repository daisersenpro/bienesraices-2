export const locales = ["es", "en", "pt", "fr", "zh", "ko"] as const;
export type Locale = (typeof locales)[number];

export const localeOptions: Array<{ code: Locale; flag: string; label: string }> = [
  { code: "es", flag: "🇨🇱", label: "Español" },
  { code: "en", flag: "🇺🇸", label: "English" },
  { code: "pt", flag: "🇧🇷", label: "Português" },
  { code: "fr", flag: "🇫🇷", label: "Français" },
  { code: "zh", flag: "🇨🇳", label: "中文" },
  { code: "ko", flag: "🇰🇷", label: "한국어" },
];

type Translation = {
  buy: string;
  rent: string;
  sell: string;
  favorites: string;
  search: string;
  searchPlaceholder: string;
  all: string;
  houses: string;
  apartments: string;
  villas: string;
  penthouses: string;
  filters: string;
  featured: string;
  featuredDescription: string;
  viewAll: string;
  marketNews: string;
  marketNewsDescription: string;
  noProperties: string;
  noPropertiesDescription: string;
  previous: string;
  next: string;
  page: string;
  of: string;
  notifications: string;
  profile: string;
  language: string;
  headlineStart: string;
  headlineHighlight: string;
  location: string;
  priceRange: string;
  minPrice: string;
  maxPrice: string;
  propertyType: string;
  operation: string;
  features: string;
  bedrooms: string;
  bathrooms: string;
  anyAmount: string;
  anyType: string;
  anyOperation: string;
  showProperties: string;
  clearFilters: string;
  close: string;
  saveFavorite: string;
  removeFavorite: string;
  noImages: string;
  viewImage: string;
  backToProperties: string;
  approximateLocation: string;
  exactLocationNotice: string;
  requestInformation: string;
  rooms: string;
  area: string;
  sale: string;
  rentLabel: string;
};

export const translations: Record<Locale, Translation> = {
  es: {
    buy: "Comprar", rent: "Alquilar", sell: "Vender", favorites: "Favoritos", search: "Buscar",
    searchPlaceholder: "Busca por ciudad, barrio o dirección...", all: "Todas", houses: "Casas",
    apartments: "Apartamentos", villas: "Villas", penthouses: "Áticos", filters: "Filtros",
    featured: "Colecciones destacadas", featuredDescription: "Propiedades seleccionadas para una mirada exigente.",
    viewAll: "Ver todas", marketNews: "Novedades del mercado", marketNewsDescription: "Nuevas oportunidades añadidas esta semana.",
    noProperties: "No encontramos propiedades", noPropertiesDescription: "Prueba con otra ubicación o tipo de propiedad.",
    previous: "Anterior", next: "Siguiente", page: "Página", of: "de", notifications: "Notificaciones",
    profile: "Perfil", language: "Idioma",
    headlineStart: "Encuentra tu", headlineHighlight: "hogar ideal",
    location: "Ubicación", priceRange: "Rango de precio (CLP)", minPrice: "Precio mínimo", maxPrice: "Precio máximo",
    propertyType: "Tipo de propiedad", operation: "Operación", features: "Características", bedrooms: "Dormitorios", bathrooms: "Baños",
    anyAmount: "Cualquier cantidad", anyType: "Cualquier tipo", anyOperation: "Venta o arriendo", showProperties: "Mostrar propiedades", clearFilters: "Limpiar filtros", close: "Cerrar",
    saveFavorite: "Guardar en favoritos", removeFavorite: "Quitar de favoritos", noImages: "Esta propiedad aún no tiene imágenes disponibles.", viewImage: "Ver imagen",
    backToProperties: "Volver a propiedades", approximateLocation: "Ubicación aproximada", exactLocationNotice: "La ubicación exacta se comparte durante el proceso de visita.",
    requestInformation: "Solicitar información", rooms: "Habitaciones", area: "Superficie", sale: "En venta", rentLabel: "En arriendo",
  },
  en: {
    buy: "Buy", rent: "Rent", sell: "Sell", favorites: "Favorites", search: "Search",
    searchPlaceholder: "Search by city, neighborhood, or address...", all: "All", houses: "Houses",
    apartments: "Apartments", villas: "Villas", penthouses: "Penthouses", filters: "Filters",
    featured: "Featured collections", featuredDescription: "Selected properties for a discerning view.",
    viewAll: "View all", marketNews: "New on the market", marketNewsDescription: "New opportunities added this week.",
    noProperties: "No properties found", noPropertiesDescription: "Try another location or property type.",
    previous: "Previous", next: "Next", page: "Page", of: "of", notifications: "Notifications",
    profile: "Profile", language: "Language",
    headlineStart: "Find your", headlineHighlight: "ideal home",
    location: "Location", priceRange: "Price range (CLP)", minPrice: "Minimum price", maxPrice: "Maximum price",
    propertyType: "Property type", operation: "Listing", features: "Features", bedrooms: "Bedrooms", bathrooms: "Bathrooms",
    anyAmount: "Any amount", anyType: "Any type", anyOperation: "Buy or rent", showProperties: "Show properties", clearFilters: "Clear filters", close: "Close",
    saveFavorite: "Save to favorites", removeFavorite: "Remove from favorites", noImages: "This property has no images available yet.", viewImage: "View image",
    backToProperties: "Back to properties", approximateLocation: "Approximate location", exactLocationNotice: "The exact location is shared during the viewing process.",
    requestInformation: "Request information", rooms: "Rooms", area: "Area", sale: "For sale", rentLabel: "For rent",
  },
  pt: {
    buy: "Comprar", rent: "Alugar", sell: "Vender", favorites: "Favoritos", search: "Buscar",
    searchPlaceholder: "Busque por cidade, bairro ou endereço...", all: "Todas", houses: "Casas",
    apartments: "Apartamentos", villas: "Villas", penthouses: "Coberturas", filters: "Filtros",
    featured: "Coleções em destaque", featuredDescription: "Imóveis selecionados para um olhar exigente.",
    viewAll: "Ver todas", marketNews: "Novidades do mercado", marketNewsDescription: "Novas oportunidades adicionadas esta semana.",
    noProperties: "Nenhum imóvel encontrado", noPropertiesDescription: "Tente outra localização ou tipo de imóvel.",
    previous: "Anterior", next: "Próxima", page: "Página", of: "de", notifications: "Notificações",
    profile: "Perfil", language: "Idioma",
    headlineStart: "Encontre seu", headlineHighlight: "lar ideal",
    location: "Localização", priceRange: "Faixa de preço (CLP)", minPrice: "Preço mínimo", maxPrice: "Preço máximo",
    propertyType: "Tipo de imóvel", operation: "Operação", features: "Características", bedrooms: "Quartos", bathrooms: "Banheiros",
    anyAmount: "Qualquer quantidade", anyType: "Qualquer tipo", anyOperation: "Comprar ou alugar", showProperties: "Mostrar imóveis", clearFilters: "Limpar filtros", close: "Fechar",
    saveFavorite: "Salvar nos favoritos", removeFavorite: "Remover dos favoritos", noImages: "Este imóvel ainda não tem imagens disponíveis.", viewImage: "Ver imagem",
    backToProperties: "Voltar aos imóveis", approximateLocation: "Localização aproximada", exactLocationNotice: "A localização exata é compartilhada durante a visita.",
    requestInformation: "Solicitar informações", rooms: "Quartos", area: "Área", sale: "À venda", rentLabel: "Para alugar",
  },
  fr: {
    buy: "Acheter", rent: "Louer", sell: "Vendre", favorites: "Favoris", search: "Rechercher",
    searchPlaceholder: "Recherchez par ville, quartier ou adresse...", all: "Toutes", houses: "Maisons",
    apartments: "Appartements", villas: "Villas", penthouses: "Penthouses", filters: "Filtres",
    featured: "Collections à la une", featuredDescription: "Des propriétés sélectionnées avec exigence.",
    viewAll: "Voir tout", marketNews: "Nouveautés du marché", marketNewsDescription: "De nouvelles opportunités chaque semaine.",
    noProperties: "Aucune propriété trouvée", noPropertiesDescription: "Essayez un autre lieu ou type de propriété.",
    previous: "Précédente", next: "Suivante", page: "Page", of: "sur", notifications: "Notifications",
    profile: "Profil", language: "Langue",
    headlineStart: "Trouvez votre", headlineHighlight: "maison idéale",
    location: "Emplacement", priceRange: "Fourchette de prix (CLP)", minPrice: "Prix minimum", maxPrice: "Prix maximum",
    propertyType: "Type de propriété", operation: "Opération", features: "Caractéristiques", bedrooms: "Chambres", bathrooms: "Salles de bain",
    anyAmount: "Toute quantité", anyType: "Tout type", anyOperation: "Acheter ou louer", showProperties: "Afficher les propriétés", clearFilters: "Effacer les filtres", close: "Fermer",
    saveFavorite: "Ajouter aux favoris", removeFavorite: "Retirer des favoris", noImages: "Cette propriété n'a pas encore d'images disponibles.", viewImage: "Voir l'image",
    backToProperties: "Retour aux propriétés", approximateLocation: "Emplacement approximatif", exactLocationNotice: "L'emplacement exact est partagé lors de la visite.",
    requestInformation: "Demander des informations", rooms: "Chambres", area: "Surface", sale: "À vendre", rentLabel: "À louer",
  },
  zh: {
    buy: "购买", rent: "租赁", sell: "出售", favorites: "收藏", search: "搜索",
    searchPlaceholder: "按城市、街区或地址搜索...", all: "全部", houses: "住宅",
    apartments: "公寓", villas: "别墅", penthouses: "顶层公寓", filters: "筛选",
    featured: "精选房源", featuredDescription: "为您精选的优质房产。",
    viewAll: "查看全部", marketNews: "市场新房源", marketNewsDescription: "本周新增的房产机会。",
    noProperties: "未找到房源", noPropertiesDescription: "请尝试其他位置或房产类型。",
    previous: "上一页", next: "下一页", page: "第", of: "页", notifications: "通知",
    profile: "个人资料", language: "语言",
    headlineStart: "寻找您的", headlineHighlight: "理想家园",
    location: "位置", priceRange: "价格范围 (CLP)", minPrice: "最低价格", maxPrice: "最高价格",
    propertyType: "房产类型", operation: "交易类型", features: "房产特点", bedrooms: "卧室", bathrooms: "浴室",
    anyAmount: "不限数量", anyType: "不限类型", anyOperation: "购买或租赁", showProperties: "显示房源", clearFilters: "清除筛选", close: "关闭",
    saveFavorite: "收藏房源", removeFavorite: "取消收藏", noImages: "该房源暂无图片。", viewImage: "查看图片",
    backToProperties: "返回房源", approximateLocation: "大概位置", exactLocationNotice: "确切位置将在看房过程中分享。",
    requestInformation: "请求信息", rooms: "卧室", area: "面积", sale: "出售", rentLabel: "出租",
  },
  ko: {
    buy: "구매", rent: "임대", sell: "판매", favorites: "즐겨찾기", search: "검색",
    searchPlaceholder: "도시, 지역 또는 주소로 검색...", all: "전체", houses: "주택",
    apartments: "아파트", villas: "빌라", penthouses: "펜트하우스", filters: "필터",
    featured: "추천 매물", featuredDescription: "엄선한 프리미엄 부동산을 만나보세요.",
    viewAll: "모두 보기", marketNews: "새로운 매물", marketNewsDescription: "이번 주에 추가된 새로운 기회입니다.",
    noProperties: "매물을 찾을 수 없습니다", noPropertiesDescription: "다른 위치나 매물 유형을 시도해 보세요.",
    previous: "이전", next: "다음", page: "페이지", of: "/", notifications: "알림",
    profile: "프로필", language: "언어",
    headlineStart: "당신의", headlineHighlight: "이상적인 집을 찾아보세요",
    location: "위치", priceRange: "가격 범위 (CLP)", minPrice: "최저 가격", maxPrice: "최고 가격",
    propertyType: "매물 유형", operation: "거래 유형", features: "특징", bedrooms: "침실", bathrooms: "욕실",
    anyAmount: "수량 무관", anyType: "유형 무관", anyOperation: "구매 또는 임대", showProperties: "매물 보기", clearFilters: "필터 초기화", close: "닫기",
    saveFavorite: "즐겨찾기에 저장", removeFavorite: "즐겨찾기에서 삭제", noImages: "아직 이용 가능한 이미지가 없습니다.", viewImage: "이미지 보기",
    backToProperties: "매물로 돌아가기", approximateLocation: "대략적인 위치", exactLocationNotice: "정확한 위치는 방문 과정에서 공유됩니다.",
    requestInformation: "정보 요청", rooms: "객실", area: "면적", sale: "매매", rentLabel: "임대",
  },
};

export function isLocale(value: string | undefined): value is Locale {
  return Boolean(value && locales.includes(value as Locale));
}

export function translateListing(value: string, locale: Locale) {
  const t = translations[locale];
  return value === "En venta" ? t.sale : value === "En alquiler" ? t.rentLabel : value;
}

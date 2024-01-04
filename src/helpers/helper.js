export const data = (string) => {
  const year = string.slice(0, 4);
  const month = string.slice(5, 7);
  const day = string.slice(8, 10);
  const time = string.slice(11, 16);
  switch (month) {
    case "01":
      return `${day} января ${year} в ${time}`;
    case "02":
      return `${day} февраля ${year} в ${time}`;
    case "03":
      return `${day} марта ${year} в ${time}`;
    case "04":
      return `${day} апреля ${year} в ${time}`;
    case "05":
      return `${day} мая ${year} в ${time}`;
    case "06":
      return `${day} июня ${year} в ${time}`;
    case "07":
      return `${day} июля ${year} в ${time}`;
    case "08":
      return `${day} августа ${year} в ${time}`;
    case "09":
      return `${day} сентября ${year} в ${time}`;

    case "10":
      return `${day} октября ${year} в ${time}`;
    case "11":
      return `${day} ноября ${year} в ${time}`;

    case "12":
      return `${day} декабря ${year} в ${time}`;
  }
};

export const dateForSeller = (string) => {
  const year = string.slice(0, 4);
  const month = string.slice(5, 7);
  const day = string.slice(8, 10);
  switch (month) {
    case "01":
      return `Продает товары с ${day} января ${year}`;
    case "02":
      return `Продает товары с ${day} февраля ${year} `;
    case "03":
      return `Продает товары с ${day} марта ${year} `;
    case "04":
      return `Продает товары с ${day} апреля ${year} `;
    case "05":
      return `Продает товары с ${day} мая ${year} `;
    case "06":
      return `${day} июня ${year} `;
    case "07":
      return `Продает товары с ${day} июля ${year} `;
    case "08":
      return `Продает товары с ${day} августа ${year} `;
    case "09":
      return `Продает товары с ${day} сентября ${year} `;

    case "10":
      return `Продает товары с ${day} октября ${year} `;
    case "11":
      return `Продает товары с ${day} ноября ${year} `;

    case "12":
      return `Продает товары с ${day} декабря ${year} `;
  }
};

export const getIMGSRC = (arr, id) => {
  const filtered = arr.filter((item) => item.ad_id === id);

  return `http://localhost:8090/${filtered[0].url}`;
};

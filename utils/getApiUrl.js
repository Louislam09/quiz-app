export const getApiUrl = ({
  amount = 0,
  category = 27,
  difficulty = '',
  type = '',
}) => {
  return `${
    // @ts-ignore
    import.meta.env.VITE_API_URL
  }?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`;
};

export const generateCommonPrismaQuery = (dto: {
  select?: string[];
  orderBy?: string;
  skip?: number;
  take?: number;
}) => {
  const { orderBy, select, skip, take } = dto;

  const [orderByKey, orderByDir] = orderBy
    ? orderBy.split(':')
    : [undefined, undefined];

  const orderByQuery =
    orderByKey && orderByDir ? { [orderByKey]: orderByDir } : {};

  let selectQuery = undefined;

  if (select) {
    const query = {};
    select.forEach((sel) => {
      query[sel] = true;
    });

    selectQuery = query;
  }

  return {
    skip,
    take,
    orderByQuery,
    selectQuery,
  };
};

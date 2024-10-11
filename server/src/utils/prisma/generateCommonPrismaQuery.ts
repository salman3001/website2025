export const generateCommonPrismaQuery = (dto: any) => {
  const { orderBy, search, select, skip, take } = dto;

  const [orderByKey, orderByDir] = orderBy
    ? orderBy.split(':')
    : [undefined, undefined];

  const orderByQuery =
    orderByKey && orderByDir ? { [orderByKey]: orderByDir } : {};

  const selectQuery = {};
  if (select) {
    select.forEach((sel) => {
      selectQuery[sel] = true;
    });
  }

  return {
    skip,
    take,
    orderByQuery,
    selectQuery,
  };
};

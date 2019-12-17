const Query = {
  deal: async (parent, {dealId}, {dataSources}) => {
    const deal = await dataSources.djangoAPI.getDeal(dealId);
    return deal;
  },
  deals: async (parent, args, {dataSources}) => {
    const deals = await dataSources.djangoAPI.getDeals();
    return deals;
  },
};

module.exports = Query;

const Mutation = {
  createDeal: async (parent, args, {dataSources}) => {
    console.log(args)
    const deal = args
    return dataSources.djangoAPI.createDeal(deal)
  },
};

module.exports = Mutation;

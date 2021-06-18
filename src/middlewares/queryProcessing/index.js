const QueryProcess = require("./QueryProcess");
const initQuery = require("./InitQuery");
const searchQuery = require("./SearchQuery");
const categoryQuery = require("./CategoryQuery");
const rangePriceQuery = require("./RangePriceQuery");
const sortQuery = require("./SortQuery");

const queryProcessPipeline = new QueryProcess();
queryProcessPipeline.addStage(initQuery);
queryProcessPipeline.addStage(searchQuery);
queryProcessPipeline.addStage(categoryQuery);
queryProcessPipeline.addStage(rangePriceQuery);
queryProcessPipeline.addStage(sortQuery);

module.exports = (req, res, next) => {
  const params = req.query;

  const { filters } = queryProcessPipeline.process(params);

  req.filterParams = filters;

  next();
};

class QueryProcess {
  constructor() {
    this.stages = [];
  }

  addStage(stage) {
    this.stages.push(stage);

    return this;
  }

  process(query) {
    let queryOutput = query;

    this.stages.forEach((stage) => {
      queryOutput = stage(queryOutput);
    });

    return queryOutput;
  }
}

module.exports = QueryProcess;

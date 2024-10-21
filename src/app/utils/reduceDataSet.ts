export function reduceDataSet(dataArray: any, targetSize = 20) {
    // If the dataset is already smaller than or equal to the target size, return it as-is
    if (dataArray.length <= targetSize) {
      return dataArray;
    }

    const reducedData = [];

    // Always include the first value
    reducedData.push(dataArray[0]);

    // Calculate the step size based on the target size
    const stepSize = (dataArray.length - 2) / (targetSize - 2);

    // Pick evenly spaced points, excluding the first and last
    for (let i = 1; i < targetSize - 1; i++) {
      const index = Math.floor(i * stepSize);
      reducedData.push(dataArray[index]);
    }

    // Always include the last value
    reducedData.push(dataArray[dataArray.length - 1]);

    return reducedData;
  }

import { chain, countBy, map, reduce, zip } from 'lodash';

export const run = (
  input: string,
): { part1: () => number; part2: () => number } => {
  const binaries = chain(input)
    .split('\r\n')
    .map((x) => x.split('').map((y) => parseInt(y)))
    .value();

  // --------------------------------------------------------------------------
  // Part 1
  // --------------------------------------------------------------------------
  const part1 = () => {
    const groupedBinaries = zip(...binaries);

    const countedBinaries = chain(groupedBinaries)
      .map((x) => countBy(x, (i) => i))
      .value();

    const mappers = [
      (x) => (x['0'] > x['1'] ? 0 : 1),
      (x) => (x['0'] < x['1'] ? 0 : 1),
    ];

    const [gammaRate, epsilonRate] = chain(mappers)
      .map((func) => map(countedBinaries, func))
      .map((x) => x.join(''))
      .map((x) => `0b${x}`)
      .map((x) => Number(x))
      .value();

    const powerConsumption = gammaRate * epsilonRate;
    return powerConsumption;
  };

  // --------------------------------------------------------------------------
  // Part 2
  // --------------------------------------------------------------------------
  const part2 = () => {
    let oxygenGeneratorRating = [...binaries];

    for (let activeBit = 0; oxygenGeneratorRating.length > 1; activeBit++) {
      const groupedBinaries = zip(...oxygenGeneratorRating);

      const countedBinaries = chain(groupedBinaries)
        .map((x) => countBy(x, (i) => i))
        .value();

      const count = countedBinaries[activeBit];
      const criteria = count['1'] >= count['0'] ? 1 : 0;

      oxygenGeneratorRating = reduce(
        oxygenGeneratorRating,
        (result, x) => (x[activeBit] === criteria ? [...result, x] : result),
        [],
      );

      //console.log(oxygenGeneratorRating);
    }

    let co2ScrubberRating = [...binaries];

    for (let activeBit = 0; co2ScrubberRating.length > 1; activeBit++) {
      const groupedBinaries = zip(...co2ScrubberRating);

      const countedBinaries = chain(groupedBinaries)
        .map((x) => countBy(x, (i) => i))
        .value();

      const count = countedBinaries[activeBit];
      const criteria = count['0'] <= count['1'] ? 0 : 1;

      co2ScrubberRating = reduce(
        co2ScrubberRating,
        (result, x) => (x[activeBit] === criteria ? [...result, x] : result),
        [],
      );

      //console.log(co2ScrubberRating);
    }

    const result = {
      oxygenGeneratorRating: Number(`0b${oxygenGeneratorRating[0].join('')}`),
      co2ScrubberRating: Number(`0b${co2ScrubberRating[0].join('')}`),
    };

    return result.oxygenGeneratorRating * result.co2ScrubberRating;
  };

  return { part1, part2 };
};

import {engToMarathiData} from '../utilities/engToMarathiData';

export const engToMarathiConverter = input => {
  let result = '';
  let i = 0;

  while (i < input.length) {
    let matchFound = false;

    // Try matching longest possible substring first
    for (let j = Math.min(4, input.length - i); j > 0; j--) {
      const substring = input.substring(i, i + j);
      if (engToMarathiData[substring]) {
        result += engToMarathiData[substring];
        i += j;
        matchFound = true;
        break;
      }
    }

    // If no match, add the letter as-is
    if (!matchFound) {
      result += input[i];
      i++;
    }
  }

  return result;
};

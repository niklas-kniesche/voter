export function address_number(x, range){
    let pair = [];
    pair.push(Math.max(0, x-range));
    pair.push(parseInt(x+range));

    return pair;
}

export function between(val, min, max) {
  return val >= min && val <= max;
}
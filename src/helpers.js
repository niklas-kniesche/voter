export function address_number(x, range){
    let pair = [];
    pair.push(Math.max(0, x-range));
    pair.push(parseInt(x+range));

    return pair;
}

export function between(val, min, max) {
  return val >= min && val <= max;
}

export function findCity(address) {
	let cityIndex = address.findIndex((field) => {
		return field.types[0] === "locality";
	});
	return address[cityIndex].long_name;
}
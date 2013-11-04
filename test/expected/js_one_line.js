var years = [1950, 1960, 1970, 1980, 1990, 2000, 2010]; 
try {
  console.log(years.0);
}
catch (ex) {
  console.log("Using bracket notation");//wo pattern
  console.log(years[0]);// @custom pattern
}
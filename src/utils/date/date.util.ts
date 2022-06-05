export function greet(date = ""): string {
  const validDate = date ? new Date(date) : new Date();
  const hours = validDate.getHours();

  let greet = "";

  switch (true) {
    case hours >= 0 && hours < 12:
      greet = "selamat pagi";
      break;
    case hours >= 12 && hours < 15:
      greet = "selamat siang";
      break;
    case hours >= 15 && hours < 19:
      greet = "selamat sore";
      break;
    case hours >= 19 && hours < 24:
      greet = "selamat malam";
      break;
    default:
      break;
  }

  return greet;
}

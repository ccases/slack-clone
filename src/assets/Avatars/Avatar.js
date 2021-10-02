const generateRandomSeed = () => {
  let seed = "";
  let randomLength = Math.floor(Math.random() * 10);
  let charArr =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < randomLength + 5; i++) {
    seed += charArr.charAt(Math.floor(Math.random() * charArr.length));
  }

  return seed;
};

const generateAvatarSrc = () => {
  let seed = generateRandomSeed();
  return `https://avatars.dicebear.com/api/micah/${seed}.svg`;
};

export default generateAvatarSrc;

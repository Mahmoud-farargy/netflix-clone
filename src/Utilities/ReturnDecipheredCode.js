export const ReturnDecipheredCode = (binary) => {
    const binCode = [];
    for (var i = 0; i < binary.length; i++) {
      binCode.push(String.fromCharCode(parseInt(binary[i], 2)));
    }
    return binCode.join("");
  };
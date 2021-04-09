export const truncateText = (str, n) => str ? (str?.length > n ? str.substr(0, n -1) + "..." : str) : "";

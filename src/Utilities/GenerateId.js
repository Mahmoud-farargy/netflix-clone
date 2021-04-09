export const generateId = () => `${Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 20)}_${Math.random() * 10}`;

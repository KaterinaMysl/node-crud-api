export const checkValidUserData = (data: string): boolean => {
  try {
    const { username, age, hobbies } = JSON.parse(data);
    if (
      username
      && typeof username === 'string'
      && age
      && typeof age === 'number'
      && hobbies
      && Array.isArray(hobbies)
      && !hobbies.find((hobby) => typeof hobby !== 'string')
    ) {
      return true;
    }
    return false;
  } catch {
    return false;
  }
};
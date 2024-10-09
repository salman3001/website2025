export function formDataToJson(formData: FormData) {
  const obj: Record<string, any> = {};
  formData.forEach((value, key) => {
    // If a key already exists, we should handle arrays
    if (obj.hasOwnProperty(key)) {
      // If the existing value is not an array, convert it to an array
      if (!Array.isArray(obj[key])) {
        obj[key] = [obj[key]];
      }
      obj[key].push(value); // Add the new value to the array
    } else {
      obj[key] = value; // Otherwise, just set the value
    }
  });
  return JSON.stringify(obj);
}

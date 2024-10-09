import { config } from "./config";
import type { IResType } from "./types";

export async function fetchApi<T>(
  url: string,
  options: RequestInit = {},
): Promise<IResType<T>> {
  try {
    const apiUrl = `${config.apIUrl}${url}`;
    const response = await fetch(apiUrl, { ...options });
    const data = (await response.json()) as IResType<T>;

    // Check if the request was successful (status in the range 200–299)
    if (!response.ok) {
      return data;
    }

    console.log(data);

    return data;
  } catch (error) {
    return { code: 424, success: false, message: "Request Error" };
  }
}

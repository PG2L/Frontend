/**
 * Fetches data from the server.
 * @param endpoint - The endpoint to fetch data from.
 * @param id - Optional ID parameter for fetching specific data.
 * @returns A Promise that resolves to the fetched data.
 */
export async function getData(endpoint: string, id?: number, spec?: string): Promise<any> {
    try {
        const res: Response = await fetch(
            `http://localhost:8000/${endpoint}${id ? `/${id}` : ''}${spec ? `/${spec}` : '' }`,
            {
                next:
                {
                    tags: [`${endpoint}`], // Add the endpoint to the tags array.
                    revalidate: 1800, // Revalidate the data every 30 minutes.
                }
            });
        if (!res.ok) {
            throw new Error('Failed to fetch data');
        }
        return await res.json();
    } catch (error) {
        console.error(error);
    }
}
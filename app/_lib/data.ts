/**
 * Fetches data from the server.
 * @param endpoint - The endpoint to fetch data from.
 * @param id - Optional ID parameter for fetching specific data.
 * @returns A Promise that resolves to the fetched data.
 */
export async function getData(endpoint: string, id?: number): Promise<any> {

    try {
        const res: Response = await fetch(
            `http://localhost:8000/${endpoint}${id ? `/${id}` : ''}`,
            {
                next:
                {
                    tags: [`${endpoint}`],
                    revalidate: 1800
                }
            });
        if (!res.ok) {
            throw new Error('Failed to fetch data');
        }
        return res.json();
    } catch (error) {
        console.error(error);
    }
}
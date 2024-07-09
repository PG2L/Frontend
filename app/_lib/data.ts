export async function getData(item: string, id?: number): Promise<any> {

    try {
        const res: Response = await fetch(
            `http://localhost:8000/${item}${id ? `/${id}` : ''}`,
            {
                next:
                {
                    tags: [`${item}`],
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
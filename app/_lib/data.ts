export async function getData(item: string, id?: number): Promise<any> {

    const res: Response = await fetch(`http://localhost:8000/${item}${id ? `/${id}` : ''}`);

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
}
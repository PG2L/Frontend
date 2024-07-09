export async function updateUserPoints(userId: number, points: number): Promise<void> {
    
    try {
        const res: Response = await fetch(
            `http://localhost:8000/users/${userId}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    total_points: points,
                }),
                next:
                {
                    tags: ['users'],
                }
            });
        if (!res.ok) {
            throw new Error('Failed to update user points');
        }
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}
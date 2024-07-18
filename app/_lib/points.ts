import handleAchievementItems from './achievements';

/**
 * Updates the points of a user.
 * @param userId - The ID of the user.
 * @param points - The new total points for the user.
 * @returns A Promise that resolves to void.
 */
export async function updateUserPoints(user: User, points: number): Promise<void> {
    try {
        const res: Response = await fetch(
            `http://localhost:8000/users/${user.id}`,
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
        handleAchievementItems({item: "points", amount: points}, user)
        return await res.json();
    } catch (error) {
        console.error(error);
    }
}
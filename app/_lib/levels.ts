import handleAchievementItems from "./achievements";

/**
 * Represents an array of levels with their corresponding information.
 * Each level object contains the level number, name, and experience points required to reach the next level.
 */
const levels: {
    level: number;
    name: string;
    expToNext: number;
}[] = [
    { level: 1, name: "Newbie", expToNext: 250 },
    { level: 2, name: "Beginner", expToNext: 350 },
    { level: 3, name: "Novice", expToNext: 500 },
    { level: 4, name: "Learner", expToNext: 700 },
    { level: 5, name: "Apprentice", expToNext: 850 },
    { level: 6, name: "Intermediate", expToNext: 1000 },
    { level: 7, name: "Skilled", expToNext: 1200 },
    { level: 8, name: "Advanced", expToNext: 1500 },
    { level: 9, name: "Expert", expToNext: 2000 },
    { level: 10, name: "Professional", expToNext: 2500 },
    { level: 11, name: "Senior", expToNext: 3000 },
    { level: 12, name: "Specialist", expToNext: 3500 },
    { level: 13, name: "Master", expToNext: 4200 },
    { level: 14, name: "Guru", expToNext: 5000 },
    { level: 15, name: "Wizard", expToNext: 6000 },
    { level: 16, name: "Genius", expToNext: 7000 },
    { level: 17, name: "Innovator", expToNext: 8000 },
    { level: 18, name: "Pioneer", expToNext: 9000 },
    { level: 19, name: "Visionary", expToNext: 10000 },
    { level: 20, name: "Legend", expToNext: 0 }
];

/**
 * Retrieves the level and remaining experience points based on the total experience points.
 * @param totalExp The total experience points.
 * @returns An array containing the level object and the remaining experience points.
 */
export function getLevelByExp(totalExp: number): [{ level: number; name: string; expToNext: number }, number] {
    for (let i: number = 0; i < levels.length; i++) {
        if (totalExp < levels[i].expToNext) {
            return [levels[i], totalExp];
        }
        totalExp -= levels[i].expToNext;
    }
    return [levels[levels.length - 1], totalExp];
}

/**
 * Updates the experience points (exp) of a user.
 * @param userId - The ID of the user.
 * @param exp - The new total experience points to set for the user.
 * @returns A Promise that resolves to void.
 */
export async function updateUserExp(user: User, exp: number): Promise<void> {
    try {
        const res: Response = await fetch(
            `http://localhost:8000/users/${user.id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    total_exp: exp,
                }),
                next:
                {
                    tags: ['users'],
                }
            });
        if (!res.ok) {
            throw new Error('Failed to update user exp');
        }
        const lvl: number = getLevelByExp(exp)[0].level;
        handleAchievementItems({item: "lvl", amount: lvl}, user)
        return await res.json();
    } catch (error) {
        console.error(error);
    }
}
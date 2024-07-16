import { getData } from "./data";
import { updateUserPoints } from "./points";

export default async function handleAchievementItems(item: Lesson | Course | {
    item: "exp" | "points",
    amount: number;
}, user: User): Promise<void> {
    console.log("Handling achievement items");
    /**
     * Represents an array of achievements.
     * @type {Achievement[]}
     */
    const achievements: Achievement[] = await getData("achievements") as Achievement[];
    if (item.hasOwnProperty("lesson_number")) {
        handleLesson(item as Lesson, user, achievements);
    }
}

/**
 * Handles the lesson completion for a user and updates the related achievements.
 * @param {Lesson} lesson - The lesson that was completed.
 * @param {User} user - The user who completed the lesson.
 * @param {Achievement[]} achievements - The achievements array.
 * @returns {Promise<void>}
 */
async function handleLesson(lesson: Lesson, user: User, achievements: Achievement[]): Promise<void> {
    console.log(achievements)
    const relatedAchievements: Achievement[] = achievements.filter((achievement: Achievement): boolean => {
        return achievement.criteria.type === "complete_lesson";
    });
    console.log(relatedAchievements)
    relatedAchievements.forEach((achievement: Achievement): void => {
        // Check if the achievement has a requirement and if it is met.
        if (achievement.criteria.requirement) { 
            const requirements: string[] = achievement.criteria.requirement.split(":");
            if ((requirements[0] === "language") && (lesson.course.language?.name.toLowerCase() !== requirements[1])) {
                return;
            } else if ((requirements[0] === "type") && (lesson.type?.name.toLowerCase() !== requirements[1])) {
                return;
            }
        }
        const userAchievement: UserAchievement | undefined = user.achievements.find((userAchievement: UserAchievement): boolean => { 
            return userAchievement.achievement.id === achievement.id;
        });
        if (userAchievement) {
            userAchievement.progress++;
            if ((userAchievement.progress >= achievement.criteria.amount) && (userAchievement.completion_status === "in-progress")) {
                userAchievement.completion_status = "completed";
                updateUserPoints(user.id, user.total_points+=achievement.points_gain);
            }
            updateUserAchievement(userAchievement);
        } else {
            createUserAchievement(user, achievement, 1);
        }
    });
}

/**
 * Updates the progress and completion status of a user achievement.
 * 
 * @param userAchievement: UserAchievement - The user achievement object to update.
 * @returns A promise that resolves with the updated data.
 */
async function updateUserAchievement(userAchievement: UserAchievement): Promise<any> {
    try {
        console.log("Updating achievement progress");
        const response = await fetch(`http://localhost:8000/user-achievements/${userAchievement.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                progress: userAchievement.progress,
                completion_status: userAchievement.completion_status
            }),
        });
        if (!response.ok) {
            throw new Error('Failed to put data');
        }
        const data: any = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

/**
 * Creates a user achievement.
 * @param user The user object.
 * @param achievement The achievement object.
 * @param progress The progress of the achievement.
 * @returns A promise that resolves with the created user achievement data.
 */
async function createUserAchievement(user: User, achievement: Achievement, progress: number): Promise<any> {
    try {
        console.log("Creating user achievement");
        const response = await fetch(`http://localhost:8000/user-achievements/new`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user: user.id,
                achievement: achievement.id,
                completion_status: progress >= achievement.criteria.amount ? "completed" : "in-progress",
                progress: progress,
            }),
        });
        if (!response.ok) {
            throw new Error('Failed to post data');
        }
        const data: any = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}
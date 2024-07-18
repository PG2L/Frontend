import { getData } from "./data";
import { updateUserPoints } from "./points";

export default async function handleAchievementItems(item: Lesson | Course | {
    item: "exp" | "points",
    amount: number;
}, user: User): Promise<Achievement[]> {
    const achievements: Achievement[] = await getData("achievements") as Achievement[];
    if (item.hasOwnProperty("lesson_number")) {
        return await handleLesson(item as Lesson, user, achievements);
    } else if (item.hasOwnProperty("language")) {
        return await handleCourse(item as Course, user, achievements);
    } else if (item.hasOwnProperty("item")) {
        return await handleNumb(item as {item: "exp" | "points",
            amount: number}, user, achievements);
    }
    return [];
}

/**
 * Handles a lesson for a user and updates their achievements accordingly.
 * @param lesson - The lesson to handle.
 * @param user - The user for whom to handle the lesson.
 * @param achievements - The list of achievements to consider.
 * @returns A promise that resolves to an array of newly completed achievements.
 */
async function handleLesson(lesson: Lesson, user: User, achievements: Achievement[]): Promise<Achievement[]> {
    const relatedAchievements: Achievement[] = achievements.filter((achievement: Achievement): boolean => {
        return achievement.criteria.type === "complete_lesson";
    });
    const newlyCompletedAchievements: Achievement[] = [];
    relatedAchievements.forEach((achievement: Achievement): void => {
        // Check if the achievement has a requirement and if it is met.
        if (achievement.criteria.requirement) { 
            const requirements: string[] = achievement.criteria.requirement.split(":");
            if (
                (requirements[0] === "language")
                && (lesson.course.language?.name.toLowerCase() !== requirements[1])
            ) {
                return;
            } else if (
                (requirements[0] === "type")
                && (lesson.types?.find((lessonType: LessonType): boolean => { return lessonType.type.name.toLowerCase() === requirements[1]; }) === undefined)
            ) {
                return;
            }
        }
        const userAchievement: UserAchievement | undefined = user.achievements.find((userAchievement: UserAchievement): boolean => { 
            return userAchievement.achievement.id === achievement.id;
        });
        if (userAchievement) { // Update the progress of the achievement if exists, otherwise create a new one.
            userAchievement.progress++;
            if ((userAchievement.progress >= achievement.criteria.amount) && (userAchievement.completion_status === "in-progress")) {
                userAchievement.completion_status = "completed";
                updateUserPoints(user, user.total_points += achievement.points_gain);
                newlyCompletedAchievements.push(achievement);
            }
            updateUserAchievement(userAchievement);
        } else {
            createUserAchievement(user, achievement, 1);
            if (1 >= achievement.criteria.amount) {
                newlyCompletedAchievements.push(achievement);
            }
        }
    });
    return newlyCompletedAchievements;
}

/**
 * Handles a course for a user and updates their achievements accordingly.
 * @param course - The course to handle.
 * @param user - The user for whom to handle the course.
 * @param achievements - The list of achievements to consider.
 * @returns A promise that resolves to an array of newly completed achievements.
 */
async function handleCourse(course: Course, user: User, achievements: Achievement[]): Promise<Achievement[]> {
    const relatedAchievements: Achievement[] = achievements.filter((achievement: Achievement): boolean => {
        return achievement.criteria.type === "complete_course";
    });
    const newlyCompletedAchievements: Achievement[] = [];
    relatedAchievements.forEach((achievement: Achievement): void => {
        // Check if the achievement has a requirement and if it is met.
        if (achievement.criteria.requirement) { 
            const requirements: string[] = achievement.criteria.requirement.split(":");
            if (
                (requirements[0] === "language")
                && (course.language?.name.toLowerCase() !== requirements[1])
            ) {
                return;
            }
        }
        const userAchievement: UserAchievement | undefined = user.achievements.find((userAchievement: UserAchievement): boolean => { 
            return userAchievement.achievement.id === achievement.id;
        });
        if (userAchievement) { // Update the progress of the achievement if exists, otherwise create a new one.
            userAchievement.progress++;
            if ((userAchievement.progress >= achievement.criteria.amount) && (userAchievement.completion_status === "in-progress")) {
                userAchievement.completion_status = "completed";
                updateUserPoints(user, user.total_points += achievement.points_gain);
                newlyCompletedAchievements.push(achievement);
            }
            updateUserAchievement(userAchievement);
        } else {
            createUserAchievement(user, achievement, 1);
            if (1 >= achievement.criteria.amount) {
                newlyCompletedAchievements.push(achievement);
            }
        }
    });
    return newlyCompletedAchievements;
}

/**
 * Handles exp and points for a user and updates their achievements accordingly.
 * @param exp - The exp to handle.
 * @param user - The user for whom to handle the exp.
 * @param achievements - The list of achievements to consider.
 * @returns A promise that resolves to an array of newly completed achievements.
 */
async function handleNumb(numb: { item: string, amount: number; }, user: User, achievements: Achievement[]): Promise<Achievement[]> {
    const relatedAchievements: Achievement[] = achievements.filter((achievement: Achievement): boolean => {
        return achievement.criteria.type === "reach";
    });
    const newlyCompletedAchievements: Achievement[] = [];
    relatedAchievements.forEach((achievement: Achievement): void => {
        // Check the requirement type and updates or create the user achievement accordingly.
        if (achievement.criteria.requirement === numb.item) { 
            const userAchievement: UserAchievement | undefined = user.achievements.find((userAchievement: UserAchievement): boolean => { 
                return userAchievement.achievement.id === achievement.id;
            });
            if (userAchievement) { // Update the progress of the achievement if it exists, otherwise create a new one.
                userAchievement.progress+=numb.amount;
                if ((userAchievement.progress >= achievement.criteria.amount) && (userAchievement.completion_status === "in-progress")) {
                    userAchievement.completion_status = "completed";
                    updateUserPoints(user, user.total_points += achievement.points_gain);
                    newlyCompletedAchievements.push(achievement);
                }
                updateUserAchievement(userAchievement);
            } else {
                createUserAchievement(user, achievement, numb.amount);
                if (numb.amount >= achievement.criteria.amount) {
                    newlyCompletedAchievements.push(achievement);
                }
            }
        }
    });
    return newlyCompletedAchievements;
}

/**
 * Updates the progress and completion status of a user achievement.
 * 
 * @param userAchievement: UserAchievement - The user achievement object to update.
 * @returns A promise that resolves with the updated data.
 */
async function updateUserAchievement(userAchievement: UserAchievement): Promise<any> {
    try {
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
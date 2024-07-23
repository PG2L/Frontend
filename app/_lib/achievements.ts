import { getData } from "./data";
import { updateUserPoints } from "./points";

/**
 * Handles the achievement items based on the provided item type and user, sorting it into the appropriate handler.
 * 
 * @param item - The item to handle, which can be a Lesson, Course, or an object with "lvl" or "points" properties.
 * @param user - The user for whom the achievements are being handled.
 * @returns A Promise that resolves to an array of Achievement objects.
 */
export default async function handleAchievementItems(item: Lesson | Course | {
    item: "lvl" | "points",
    amount: number;
}, user: User): Promise<Achievement[]> {
    /**
     * Represents an array containing every achievements.
     */
    const achievements: Achievement[] = await getData("achievements") as Achievement[];
    if (item.hasOwnProperty("lesson_number")) {
        return await handleLesson(item as Lesson, user, achievements);
    } else if (item.hasOwnProperty("language")) {
        return await handleCourse(item as Course, user, achievements);
    } else if (item.hasOwnProperty("item")) {
        return await handleNumb(item as {item: "lvl" | "points",
            amount: number}, user, achievements);
    }
    return [];
}

/**
 * Handles a lesson and checks if any achievements are completed based on the lesson's criteria.
 * 
 * @param lesson - The lesson to be handled.
 * @param user - The user associated with the lesson.
 * @param achievements - The list of achievements to check against.
 * @returns A Promise that resolves to an array of newly completed achievements.
 */
async function handleLesson(lesson: Lesson, user: User, achievements: Achievement[]): Promise<Achievement[]> {
    const relatedAchievements: Achievement[] = achievements.filter((achievement: Achievement): boolean => (
        achievement.criteria.type === "complete_lesson"
    ));
    const newlyCompletedAchievements: Achievement[] = [];
    relatedAchievements.forEach((achievement: Achievement): void => {
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
        const userAchievement: UserAchievement | undefined = user.achievements.find((userAchievement: UserAchievement): boolean => (
            userAchievement.achievement.id === achievement.id
        ));
        if (handleProgressionAndCheckIsCompleted(achievement, user, userAchievement)) {
            newlyCompletedAchievements.push(achievement);
        };
    });
    return newlyCompletedAchievements;
}

/**
 * Handles the course completion and checks if any related achievements are completed.
 * 
 * @param course - The course being completed.
 * @param user - The user who completed the course.
 * @param achievements - The list of achievements.
 * @returns A promise that resolves to an array of newly completed achievements.
 */
async function handleCourse(course: Course, user: User, achievements: Achievement[]): Promise<Achievement[]> {
    const relatedAchievements: Achievement[] = achievements.filter((achievement: Achievement): boolean => (
        achievement.criteria.type === "complete_course"
    ));
    const newlyCompletedAchievements: Achievement[] = [];
    relatedAchievements.forEach((achievement: Achievement): void => {
        if (achievement.criteria.requirement) { 
            const requirements: string[] = achievement.criteria.requirement.split(":");
            if (
                (requirements[0] === "language")
                && (course.language?.name.toLowerCase() !== requirements[1])
            ) {
                return;
            }
        }
        const userAchievement: UserAchievement | undefined = user.achievements.find((userAchievement: UserAchievement): boolean => ( 
            userAchievement.achievement.id === achievement.id
        ));
        if (handleProgressionAndCheckIsCompleted(achievement, user, userAchievement)) {
            newlyCompletedAchievements.push(achievement);
        };
    });
    return newlyCompletedAchievements;
}

/**
 * Handles the given `numb` object to update user achievements based on the criteria.
 * 
 * @param numb - The `numb` object containing the item and amount.
 * @param user - The user object.
 * @param achievements - The array of achievements.
 * @returns A promise that resolves to an array of newly completed achievements.
 */
async function handleNumb(numb: { item: string, amount: number; }, user: User, achievements: Achievement[]): Promise<Achievement[]> {
    const relatedAchievements: Achievement[] = achievements.filter((achievement: Achievement): boolean => {
        return achievement.criteria.type === "reach";
    });
    const newlyCompletedAchievements: Achievement[] = [];
    relatedAchievements.forEach((achievement: Achievement): void => {
        if (achievement.criteria.requirement === numb.item) { 
            const userAchievement: UserAchievement | undefined = user.achievements.find((userAchievement: UserAchievement): boolean => ( 
                userAchievement.achievement.id === achievement.id
            ));
            if (userAchievement) { 
                numb.item === "lvl" ? userAchievement.progress = numb.amount : userAchievement.progress += numb.amount;
                if ((userAchievement.progress >= achievement.criteria.amount) && (userAchievement.completion_status === "in-progress")) {
                    userAchievement.completion_status = "completed";
                    updateUserPoints(user, user.total_points += achievement.points_gain);
                    newlyCompletedAchievements.push(achievement);
                }
                updateUserAchievement(userAchievement);
            } else {
                createUserAchievement(user, achievement, numb.amount);
                if (numb.amount >= achievement.criteria.amount) {
                    // updateUserPoints(user, user.total_points += achievement.points_gain);
                    newlyCompletedAchievements.push(achievement);
                }
            }
        }
    });
    return newlyCompletedAchievements;
}

/**
 * Handles the progression of an achievement and checks if it is completed.
 * 
 * @param achievement - The achievement object.
 * @param user - The user object.
 * @param userAchievement - The user achievement object.
 * @returns A boolean indicating whether the achievement is completed or not.
 */
function handleProgressionAndCheckIsCompleted(achievement: Achievement, user: User, userAchievement: UserAchievement | undefined): boolean {
    if (userAchievement !== undefined) {
        userAchievement.progress++;
        if ((userAchievement.progress >= achievement.criteria.amount) && (userAchievement.completion_status === "in-progress")) {
            userAchievement.completion_status = "completed";
            updateUserPoints(user, user.total_points += achievement.points_gain);
            return true;
        }
        updateUserAchievement(userAchievement);
    } else {
        createUserAchievement(user, achievement, 1);
        if (1 >= achievement.criteria.amount) {
            updateUserPoints(user, user.total_points += achievement.points_gain);
            return true;
        }
    }
    return false;
}

/**
 * Updates the user achievement progress and completion status.
 * 
 * @param userAchievement - The user achievement object to update.
 * @returns A Promise that resolves to the updated user achievement data.
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
 * 
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
import { revalidatePath, revalidateTag } from "next/cache";

export async function addCourseToUser(courseId: number, userId: number): Promise<void> {
    try {
        const response = await fetch(`http://localhost:8000/user-courses/new`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                course: courseId,
                user: userId,
            }),
        });
        if (!response.ok) {
            throw new Error('Failed to put data');
        }
        const data = await response.json();
        revalidatePath('/', 'layout');
        revalidateTag('users');
        return data;
    } catch (error) {
        console.error(error);
    }
}

export async function updateCourseProgress(userCourse): Promise<any> {
    try {
        const response = await fetch(`http://localhost:8000/user-courses/${userCourse.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                progress: userCourse.progress + 1,
            }),
        });
        if (!response.ok) {
            throw new Error('Failed to put data');
        }
        const data: any = await response.json();
        revalidatePath('/', 'layout');
        revalidateTag('users');
        return data;
    } catch (error) {
        console.error(error);
    }
}

export async function updateCourseCompletion(userCourse, status: string): Promise<any> {
    try {
        const response = await fetch(`http://localhost:8000/user-courses/${userCourse.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                progress: userCourse.course.lessons_count,
                completion_status: status,
                completion_date: new Date(),
            }),
        });
        if (!response.ok) {
            throw new Error('Failed to put data');
        }
        const data: any = await response.json();
        revalidatePath('/', 'layout');
        revalidateTag('users');
        return data;
    } catch (error) {
        console.error(error);
    }
}
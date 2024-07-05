export async function addCourseToUser(courseId: number, userId: number): Promise<void> {
    try {
        const response = await fetch(`http://localhost:8000/userCourses/new`, {
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
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}
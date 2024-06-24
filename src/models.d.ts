interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    created_at: string;
    firstname: string;
    lastname: string;
    address: string;
    country_name: string;
    total_exp: number;
    total_points: number;
    role: 'User' | 'Admin';
    courses: Course[];
}

interface Course {
    id: number;
    title: string;
    description: string;
    points_gain: number;
    exp_gain: number;
    difficulty: 'Beginner' | 'Novice' | 'Intermediate' | 'Advanced' | 'Expert' | 'Master' | 'Master+';
    lessons_count: number;
    lessons: Lesson[];
    category: Category;
    language: Language;
    is_free: boolean;
    price: number;
}

interface Lesson {
    id: number;
    title: string;
    description: string;
    content: string;
    points_gain: number;
    exp_gain: number;
    lesson_number: number;
    course: Course;
    assessment: Assessment;
}

interface Assessment {
    id: number;
    title: string;
    description: string;
    content: string;
    lesson: Lesson;
}

interface Category {
    id: number;
    name: string;
}

interface Language {
    id: number;
    name: string;
}

interface Skill {
    id: number;
    name: string;
}
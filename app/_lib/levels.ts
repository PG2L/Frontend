const levels: {
    level: number;
    name: string;
    expToNext: number;
}[] = [
    { level: 1, name: "Newbie", expToNext: 200 },
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

export function getLevelByExp(totalExp: number): [{ level: number; name: string; expToNext: number }, number] {
    let exp: number = totalExp;
    for (let i: number = 0; i < levels.length; i++) {
        if (exp < levels[i].expToNext) {
            return [levels[i], exp];
        }
        exp -= levels[i].expToNext;
    }
}
export const getComplexityMultiplier = (subject: string): number => {
  const technicalSubjects = ["Mathematics", "Physics", "Computer Science", "Engineering", "Data Science", "Cybersecurity", "Artificial Intelligence", "Machine Learning", "Robotics", "Quantum Mechanics"];
  const complexSubjects = ["Aerospace Engineering", "Advanced Calculus", "Biochemistry", "Molecular Genetics", "Nuclear Engineering", "Thermodynamics", "Fluid Dynamics"];

  if (complexSubjects.some(s => subject.includes(s))) return 2.0;
  if (technicalSubjects.some(s => subject.includes(s))) return 1.5;
  return 1.0;
};

export const getUrgencyMultiplier = (deadline: Date): number => {
  const now = new Date();
  const hoursToDeadline = (deadline.getTime() - now.getTime()) / (1000 * 60 * 60);

  if (hoursToDeadline < 24) return 2.0;
  if (hoursToDeadline < 72) return 1.5;
  return 1.0;
};

export const calculatePrice = (pages: number, subject: string, deadline: Date, discountCode?: string): number => {
  const basePricePerPage = 15;
  const complexityMultiplier = getComplexityMultiplier(subject);
  const urgencyMultiplier = getUrgencyMultiplier(deadline);

  let price = pages * basePricePerPage * complexityMultiplier * urgencyMultiplier;
  
  if (discountCode) {
    const cleanCode = discountCode.trim().toUpperCase();
    if (cleanCode === 'FIRST20') {
      price *= 0.8;
    } else if (/^WELCOME-[A-Z0-9]{5}$/.test(cleanCode)) {
      price *= 0.85; // 15% discount for uniquely generated newsletter subscribers
    }
  }

  return price;
};

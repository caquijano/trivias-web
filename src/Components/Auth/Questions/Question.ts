export interface Question{
    _id?: string;
    idCategory?: string;
    question: string;
    correctAnswer: string;
    inCorrectAnswer1: string;
    inCorrectAnswer2: string;
    inCorrectAnswer3: string;
    multimedia?: string;
    createAt?: string | Date;
    CreateBy?: string;

}
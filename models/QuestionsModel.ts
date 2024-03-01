import mongoose from "mongoose"

interface Answer {
    A:string,
    B:string,
    C:string,
    D:string,
}

export type TQuestions={
    _id?:string,
    question:string,
    answers: {A:string, B:string, C:string, D:string},
    correct_answer:string,
    category: Array<string>,
    type:string,
    createdBy:mongoose.Schema.Types.ObjectId,
    img?:string,
}

const schema = new mongoose.Schema<TQuestions>({
    question: { type: String, required: true },
    answers: { type: Object, required: true },
    correct_answer: { type: String, required: true, enum:["A", "B", "C", "D"]},
    category: [{ type:String, required: true }],
    type: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, required: true, ref:"administrator" },
    img: { type: String, required: false },
})

export const Questions  = mongoose.models.question || mongoose.model<TQuestions>("question", schema)
import type { SubjectHeading } from "./subjectHeading";

export interface Subject {
    data: any[];
    id: number;
    count:number;
    slug:string;
    subject:string;
    subject_headings: SubjectHeading[];
    active:number;
    created_at:Date;
    updated_at:Date;
}
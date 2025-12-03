export type Article = {
    data: any[];
    id: number;
    count:number;
    slug:string;
    subject:string;
    title:string;
    description:string;
    description_text:string;
    source_url:string;
    publish_date?: Date;
    content_type?: string;
    region?: string;
    active:number;
    created_at:Date;
    updated_at:Date;
    
}
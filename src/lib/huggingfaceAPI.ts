import * as z from "zod";

export const SiblingSchema = z.object({
    "rfilename": z.string(),
});
export type Sibling = z.infer<typeof SiblingSchema>;

export const ModelSchema = z.object({
    "_id": z.string(),
    "id": z.string(),
    "author": z.string(),
    "lastModified": z.coerce.date(),
    "likes": z.number(),
    "private": z.boolean(),
    "sha": z.string(),
    "downloads": z.number(),
    "tags": z.array(z.string()),
    "pipeline_tag": z.string().optional(),
    "library_name": z.string().optional(),
    "siblings": z.array(SiblingSchema),
    "modelId": z.string(),
});
export type Model = z.infer<typeof ModelSchema>;

import z from "zod";

const ACCEPTED_TYPE = ["image/png", "image/jpeg", "image/gif"];
const MAX_FILE_SIZE = 2000000;

export const ImageSchema = z
  .instanceof(File, { error: "Please select a file." })
  .refine((file) => ACCEPTED_TYPE.includes(file.type), {
    error: `Only ${ACCEPTED_TYPE.join(", ")} file are supported.`,
  })
  .refine((file) => file?.size <= MAX_FILE_SIZE, {
    error: `Image size must be less then ${MAX_FILE_SIZE / 1000000} mb.`,
  });

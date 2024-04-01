import { ZodError, ZodIssue } from "zod";

interface TransformedIssue {
  field: string;
  message: string;
}

const handleZodError = (err: ZodError) => {
  let zodMessage = "";

  err.issues?.forEach((issue: ZodIssue) => {
    zodMessage = zodMessage + " " + issue.message;
  });

  const formatedIssues = err.issues.reduce(
    (transformedIssues: TransformedIssue[], issue) => {
      const field = issue.path[0] as string;
      const message = issue.message;

      transformedIssues.push({ field, message });
      return transformedIssues;
    },
    []
  );

  return {
    zodMessage,
    formatedIssues,
  };
};

export default handleZodError;

import { NextRequest } from "next/server";
import { z } from "zod";

// string, boolean, number
const determineSchemaType = (schema: any) => {
  if (!schema.hasOwnProperty("type")) {
    if (Array.isArray(schema)) {
      return "array";
    } else {
      return typeof schema;
    }
  }
};

const jsonSchemaToZod = (schema: any) => {
  const type = determineSchemaType(schema);

  switch (type) {
    case "string":
      return z.string().nullable();
    case "number":
      return z.number().nullable();
  }
};

export const POST = async (req: NextRequest) => {
  const body = await req.json();

  // step 1: make sure incoming request is valid
  const genericSchema = z.object({
    data: z.string(),
    format: z.object({}).passthrough(),
  });

  const { data, format } = genericSchema.parse(body);

  // step 2: create a schema from the expected user format
  const dynamicSchema = jsonSchemaToZod(format);

  console.log("res", res);

  return new Response("Ok");
};

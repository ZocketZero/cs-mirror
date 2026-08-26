import yaml from "js-yaml";
import { Elysia } from "elysia";

export function getHeaderValue(
  headers: { [key: string]: string },
  id: string | undefined,
  format: string | undefined
) {
  if (format === "yaml" || id === ".yaml") return yaml.dump({ headers });
  else if (id !== undefined && id !== ".json")
    return { message: "this format is not avaliable" };
  else return { headers };
}

export const headersRoute = new Elysia()
  .get("/headers", ({ request, query }) =>
    getHeaderValue(Object.fromEntries(request.headers), undefined, query.format)
  )
  .get("/headers:id", ({ request, params }) =>
    getHeaderValue(
      Object.fromEntries(request.headers),
      "id" in params && typeof params.id === "string" ? params?.id : undefined,
      undefined
    )
  );

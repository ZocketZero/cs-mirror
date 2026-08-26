import yaml from "js-yaml";
import { Elysia } from "elysia";

function stripXHeaders(obj: { [key: string]: string }, caseInsensitive = true) {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) =>
      caseInsensitive
        ? !key.toLowerCase().startsWith("x-")
        : !key.startsWith("x-")
    )
  );
}

export function getHeaderValue(
  headers: { [key: string]: string },
  id: string | undefined,
  format: string | undefined
) {
  const headers_filter = stripXHeaders(headers);
  if (format === "yaml" || id === ".yaml") return yaml.dump({ headers: headers_filter });
  else if (id !== undefined && id !== ".json")
    return { message: "this format is not avaliable" };
  else return { headers: headers_filter };
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

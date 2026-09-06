import Elysia from "elysia";

// @ts-ignore
export const titleIpRoute = new Elysia().get("/title-ip", ({ ip, set }) => {
  set.headers['content-type'] = "text/html"
  return `<html><head><title>${ip}</title></head><h1>${ip}</h1><body></body></html>`
})

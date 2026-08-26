import { Elysia } from "elysia";
import { ip } from "elysia-ip"
import { headersRoute } from "./utils/headers";
import { userAgentRoute } from "./utils/user_agent";
import { getHeaderValue } from "./utils/headers";

const ipRoute = new Elysia()
  .use(ip())
  .get("/ip", ({ ip }) => {
    return ip ? ip : "Undifind"
  })

export default new Elysia()
  .use(ip())
  .use(ipRoute)
  .use(headersRoute)
  .use(userAgentRoute)
  .get("/", ({ ip, request, query }) => {
    let header = getHeaderValue(Object.fromEntries(request.headers), undefined, query.format)
    return {
      ip: ip,
      userAgent: request.headers.get('user-agent'),
      header,
      pages: {
        '/user-agent': 'view user-agent',
        '/ip': 'get your ip',
        '/headers': 'view your headers'
      }
    }
  })

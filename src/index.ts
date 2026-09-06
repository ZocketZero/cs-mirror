import { Elysia } from "elysia";
import { ip } from "elysia-ip"
import { headersRoute } from "./utils/headers";
import { userAgentRoute } from "./utils/user_agent";
import { getHeaderValue } from "./utils/headers";
import { titleIpRoute } from "./utils/title-ip";

const ipRoute = new Elysia()
  .use(ip())
  .get("/ip", ({ ip }: { ip: string }) => {
    return ip ? ip : "Undifind"
  })

export default new Elysia()
  .use(ip())
  .use(ipRoute)
  .use(headersRoute)
  .use(userAgentRoute)
  .use(titleIpRoute)
  // @ts-ignore
  .get("/", ({ ip, request, query }) => {
    let header = getHeaderValue(Object.fromEntries(request.headers), undefined, query.format)
    return {
      ip: ip,
      userAgent: request.headers.get('user-agent'),
      header,
      pages: {
        '/user-agent': 'view user-agent',
        '/ip': 'get your ip',
        '/headers': 'view your headers',
        '/title-ip': 'show ip in title'
      }
    }
  }).listen(4000)

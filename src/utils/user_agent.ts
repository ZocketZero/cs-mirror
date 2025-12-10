import Elysia from "elysia";

export const userAgentRoute = new Elysia()
.get('/user-agent', ({request}) => {
  return request.headers.get('user-agent')
})

import { Hono } from 'hono'

const app = new Hono()

async function AuthMiddleware(c:any, next:any) {
  if(c.req.header("auth")){
    //do validation 
    next()
  }else{
    return c.text('you do not have access')
  }
}

// app.use(AuthMiddleware) // In case you want to check this middleware in every req

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.post('/', AuthMiddleware, (c) => {
  return c.json({
    "message":"This is the post message"})
})

export default app

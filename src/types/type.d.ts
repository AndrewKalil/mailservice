interface IArticle {
  id: number
  title: string
  body: string
}

type ArticleState = {
  articles: IArticle[]
}

type ArticleAction = {
  type: string
  article: IArticle
}

type DispatchType = (args: ArticleAction) => ArticleAction

type ProtectedRouteProps = {
  isAuthenticated: boolean
  authenticationPath: string
} & RouteProps

type BadgeProps = {
  type: string
  title: string
}

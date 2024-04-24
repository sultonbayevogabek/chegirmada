export interface CommentModel {
  pk: number
  user: number
  created_at: string
  text: string
  user_fullname: string
  is_deleted: boolean
  children_exist: boolean
}

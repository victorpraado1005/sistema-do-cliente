import { Users } from "./data"

export function getUserByEmailAndRetoolId(email: String, retool_id: Number) {
  const user = Users.find(user => user.email === email && user.retool_id === retool_id)
  
  if (!user) {
   throw new Error("Usuário não encontrado") 
  }

  return user
}
import mongoose from 'mongoose'

const users = new mongoose.Schema({
  usuario: { type: String, require: true, max: 100 },
  email:{type: String, require: true, max: 100},
  password: { type: String, require: true, max: 100 },
})

export const modelUsuarios = mongoose.model('usuarios', users)

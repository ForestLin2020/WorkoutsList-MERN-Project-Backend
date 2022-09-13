import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator"; 

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true })

// static signup method, customize function
// *** "this" cannot used in "arrow function"
// <schema name>.statics.<function name> = async function () { }
userSchema.statics.signup = async function (email, password) {
  
  // validation
  if (!email || !password) {
    throw Error('All fields must be filled')
  }
  if (!validator.isEmail(email)) {
    throw Error('Email is not valid')
  }
  if (!validator.isStrongPassword(password)) {
    throw Error('Password not strong enough')
  }
  
  const exists = await this.findOne({ email })  
  if (exists) {
    throw Error('Email already in use')
  }

  const salt = await bcrypt.genSalt(10) // define how many salt you want to add
  const hash = await bcrypt.hash(password, salt) // chop and stir with salt

  const user = await this.create({ email, password: hash })

  return user
}

userSchema.statics.login = async function (email, password) {
  // validation
  if (!email || !password) {
    throw Error('All fields must be filled')
  }

  const user = await this.findOne({ email })  
  if (!user) {
    throw Error('Incorrect email')
  }

  // compare input password and database password
  const match = await bcrypt.compare(password, user.password)

  if (!match) {
    throw Error('Incorrect password')
  }

  return user
}


export default mongoose.model('User', userSchema)

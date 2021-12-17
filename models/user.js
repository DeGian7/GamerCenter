const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const saltRounds = 10;

const UserSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    useremail: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})

//amtes de que se ejcute los datos
UserSchema.pre("save", function(next){
    if(this.isNew || this.isModified("password")){
        const document = this;
        bcrypt.hash(document.password, saltRounds, (err, hashedPassword) =>{
            if(err){
                next(err);
            }else{
                document.password = hashedPassword;
                next();
            }
        });
    }else{
        next();
    }
})

//comparar el password con la de datos
UserSchema.methods.isCorrectPassword = function(password, callback){
    bcrypt.compare(password, this.password, function(err, same){
        if(err){
            callback(err);
        }else{
            callback(err, same);
        }
    })
}

module.exports = mongoose.model("User", UserSchema);
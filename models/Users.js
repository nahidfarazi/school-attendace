const { model, Schema } = require('mongoose');


const userSchema = new Schema({
    name:{
        type:String,
         required:true,
         
    },
    email:{
        type:String,
         required:true,
        validate:{
            validator:function(v){
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: (props) => `invalid email: ${props.value}`,
        },
    },
    password:{
        type:String,
        required:true,
        minlength:[8, 'password too short'],
    },
    role:{
        type:[String],
         required:true,
        default:'STUDENT',
    },
    accountStatus:{
        type:String,
        enum:['PENDING', 'ACTIVE', 'REJECTED'],
        default:'PENDING',
        required: true,
         
    },
});

const User = model('User', userSchema)

module.exports = User;
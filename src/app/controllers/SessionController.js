import User from '../models/User';
import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';


class SessionController{
   
    async store(req,res){
        await console.log(req.body)
        await console.log(req.body.email)
        
        const {email, password} = await req.body;

        const user = await User.findOne({
            where:{email}})

           

        
        // const user = await User.findOne({ where: email }
        
        //const user = await User.findOne({where:{email}})
        // const user = await User.findOne({
        //     where:{email}})

            //  const userExists = await User.findOne({
            // where: {
            //     email: req.body.email
            // }

            //    const user = await User.findOne({
            // where: {
            //     email: req.body.email
            // }})

        if(!user){
            return res.status(401).json({error:'Usuário não encontrado'})
        }
        if(!(await user.checkPassword(password))){
            return res.status(401).json({error: 'Senha inválida'})
        }


         const {id,name} = user;

        // const id = '20';
        // const name= 'aew';
   


        return res.json({
            user:{
                id,name,email
            },
            token:jwt.sign({id},authConfig.secret,{expiresIn:authConfig.expires})})

            
    }
}

export default new SessionController();
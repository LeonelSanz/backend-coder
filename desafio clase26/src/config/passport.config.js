import passport from 'passport';
import local from 'passport-local';
import { usersServices } from '../dao/index.js';
import { validatePassword } from '../utils.js';
import GithubStrategy from 'passport-github2';

const LocalStrategy = local.Strategy;

const initializeStrategies = () => {
    passport.use('login', new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
        if (!email || !password) return done(null, false, { message: "Valores incompletos" })
        const user = await usersServices.getBy({ email });
        if (!user) return done(null, false, { message: "Credenciales inválidas" })
        const isValidPassword = await validatePassword(password, user.password);
        if (!isValidPassword) return done(null, false, { message: "Contraseña inválida" })
        //SI LLEGASTE HASTA AQUÍ, ES PORQUE SI TE LOGUEASTE CORRECTAMENTE
        return done(null, user)
    }))

    passport.use('github', new GithubStrategy({
        clientID: "Iv1.c38843475cfa2fc8",
        clientSecret: "2c4c8a6f504d93ac582caf5466984649c0c7a0f6",
        callbackURL: "http://localhost:8080/api/sessions/githubcallback"
    }, async (accessToken, refreshToken, profile, done) => {
        try {

            //¿Y cómo funciona?
            console.log(profile);
            const { name, email } = profile._json;
            const user = await usersServices.getBy({ email });
            if (!user) {
                //A diferencia del login, si no existe el usuario, NO ME QUEJO, LO CREO
                const newUser = {
                    first_name: name,
                    email,
                    password: ''
                }
                const result = await usersServices.save(newUser);
                return done(null, result);
            }
            done(null, user);

        } catch (error) {
            done(error);
        }
    }))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })
    passport.deserializeUser(async (id, done) => {
        const result = await usersServices.getBy({ _id: id })
        done(null, result);
    })

}

export default initializeStrategies;
import React from 'react'
import jwt from "jsonwebtoken";
import config from "../../config";
import { stringify } from 'querystring';

export default async function Token(props:any) {
    const {auth} = props
    let userId
    let userEmail
    await auth.onAuthStateChanged((response:any) => {
      userId = response.uid
      userEmail = response.email })
        const token:any = jwt.sign(
            {
                id: userId,
                email: userEmail
            },
            config.SECRET,
            { expiresIn: 86400 }
        )

    return token;
}

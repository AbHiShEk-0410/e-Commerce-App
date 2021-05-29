export function checkSignupParams(userDetails) {
    const emailExpression = new RegExp('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9]+[.]+[a-z]{2,}$')
    const { name, email, password, confirmPassword } = userDetails;
    if (!name || name.length < 3) {
        return ({
            success: false,
            faultIn: "name"
        })
    }
    else if (emailExpression.test(email)) {
        if ((!!password && !!confirmPassword) && password === confirmPassword) {
            return ({
                success: true,
            })
        }
        else {
            return ({
                success: false,
                faultIn : "password"
            })
        }
    }
    else {
        return ({
            success: false,
            faultIn: "email"
        })
    }
}
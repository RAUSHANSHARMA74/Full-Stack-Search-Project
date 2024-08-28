export function forgotPasswordEmail(to, name, resetLink) {
    return {
        to,
        subject: "Forgot Password",
        text:
            `Hello ${name},
            You are receiving this email because you requested to reset your password.
            Please click on the following link to reset your password:
            ${resetLink}
            If you did not request this password reset, please ignore this email.
            Best regards,
            Raushan`,

        html:
            `<p>Hello ${name},</p>
            <p>You are receiving this email because you requested to reset your password.</p>
            <p>Please click on the following link to reset your password:</p>
            <p><a href="${resetLink}">Reset Password</a></p>
            <p>If you did not request this password reset, please ignore this email.</p>
            <p>For any inconvenience, please reach out to us.</p>
            <p>Best regards,<br>Raushan</p>`,
    };
}

export function emailVerification(to, verificationLink) {
    return {
        to,
        subject: "Verify Your Email ",

        text:
            `Hello,
            Thank you for registering with To complete your registration, please click on the following link to verify your email:
            ${verificationLink}
            If you did not sign up, please ignore this email.
            Best regards,
            Raushan`,

        html:
            `<p>Hello,</p>
            <p>Thank you for registering!  To complete your registration, please click on the following link to verify your email:</p>
            <p><a href="${verificationLink}">Verify Email</a></p>
            <p>If you did not sign up, please ignore this email.</p>
            <p><b>Best regards,</b><br>
            <b>Raushan</b></p>`,
    };
}


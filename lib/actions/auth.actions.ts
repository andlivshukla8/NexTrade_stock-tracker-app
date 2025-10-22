'use server';

import {auth} from "@/lib/better-auth/auth";
import {inngest} from "@/lib/inngest/client";
import {headers} from "next/headers";

export const signUpWithEmail = async ({ email, password, fullName, country, investmentGoals, riskTolerance, preferredIndustry }: SignUpFormData) => {
    try {
        const response = await auth.api.signUpEmail({ body: { email, password, name: fullName } })

        if(response) {
            // Send welcome email asynchronously
            try {
                await inngest.send({
                    name: 'app/user.created',
                    data: { email, name: fullName, country, investmentGoals, riskTolerance, preferredIndustry }
                })
            } catch (emailError) {
                console.error('Failed to send welcome email:', emailError)
                // Don't fail signup if email fails
            }
        }

        return { success: true, data: response }
    } catch (e: any) {
        console.error('Sign up failed:', e)
        const errorMessage = e?.message || 'Sign up failed. Please try again.'
        return { success: false, error: errorMessage }
    }
}

export const signInWithEmail = async ({ email, password }: SignInFormData) => {
    try {
        const response = await auth.api.signInEmail({ body: { email, password } })

        return { success: true, data: response }
    } catch (e: any) {
        console.error('Sign in failed:', e)
        const errorMessage = e?.message || 'Invalid email or password. Please try again.'
        return { success: false, error: errorMessage }
    }
}

export const signOut = async () => {
    try {
        await auth.api.signOut({ headers: await headers() });
        return { success: true }
    } catch (e: any) {
        console.error('Sign out failed:', e)
        const errorMessage = e?.message || 'Sign out failed. Please try again.'
        return { success: false, error: errorMessage }
    }
}
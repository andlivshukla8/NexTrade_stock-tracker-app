'use client';

import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import InputField from '@/components/forms/InputField';
import FooterLink from '@/components/forms/FooterLink';
import {signInWithEmail} from "@/lib/actions/auth.actions";
import {toast} from "sonner";
import {useRouter, useSearchParams} from "next/navigation";
import {useEffect} from "react";

const SignIn = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignInFormData>({
        defaultValues: {
            email: '',
            password: '',
        },
        mode: 'onBlur',
    });

    useEffect(() => {
        // Show success message if user just signed up
        const fromSignUp = searchParams.get('fromSignUp');
        if (fromSignUp === 'true') {
            toast.success('Account created successfully!', {
                description: 'Please sign in with your credentials.'
            });
            // Clean up the URL parameter
            router.replace('/sign-in');
        }
    }, [searchParams, router]);

    const onSubmit = async (data: SignInFormData) => {
        try {
            const result = await signInWithEmail(data);
            if(result.success) {
                toast.success('Welcome back!', {
                    description: 'You have been successfully signed in.'
                });
                router.push('/');
            } else {
                toast.error('Sign in failed', {
                    description: result.error || 'Invalid credentials. Please try again.'
                });
            }
        } catch (e) {
            console.error('Sign in error:', e);
            toast.error('Sign in failed', {
                description: e instanceof Error ? e.message : 'An unexpected error occurred. Please try again.'
            })
        }
    }

    return (
        <>
            <h1 className="form-title">Welcome back</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <InputField
                    name="email"
                    label="Email"
                    placeholder="contact@example.com"
                    register={register}
                    error={errors.email}
                    validation={{ 
                        required: 'Email is required', 
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: 'Please enter a valid email address'
                        }
                    }}
                />

                <InputField
                    name="password"
                    label="Password"
                    placeholder="Enter your password"
                    type="password"
                    register={register}
                    error={errors.password}
                    validation={{ 
                        required: 'Password is required', 
                        minLength: {
                            value: 8,
                            message: 'Password must be at least 8 characters long'
                        }
                    }}
                />

                <Button type="submit" disabled={isSubmitting} className="yellow-btn w-full mt-5">
                    {isSubmitting ? 'Signing In' : 'Sign In'}
                </Button>

                <FooterLink text="Don't have an account?" linkText="Create an account" href="/sign-up" />
            </form>
        </>
    );
};
export default SignIn;
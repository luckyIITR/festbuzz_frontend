'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import pinkdiamond from '../../../public/assets/PinkDiamond.png'
import fb from '../../../public/assets/gmailicon.webp'
import insta from '../../../public/assets/Insta.png'
import linkedin from '../../../public/assets/linkedin.png'
import whiteDiamond from '../../../public/assets/WhiteDiamond.png'
import CallToAction from '../components/CallToAction'
import Link from 'next/link'
import "react-toastify/dist/ReactToastify.css";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
const ABSTRACT_API_KEY = process.env.NEXT_PUBLIC_ABSTRACT_API_KEY;

// Debug logging to check environment variables
console.log("Environment variables check:", {
    SERVICE_ID: SERVICE_ID ? "Set" : "Missing",
    TEMPLATE_ID: TEMPLATE_ID ? "Set" : "Missing",
    PUBLIC_KEY: PUBLIC_KEY ? "Set" : "Missing",
    ABSTRACT_API_KEY: ABSTRACT_API_KEY ? "Set" : "Missing"
});

interface FormData {
    name: string;
    email: string;
    message: string;
}

interface FormErrors {
    name?: string;
    email?: string;
    message?: string;
    config?: string;
}

const ContactPage: React.FC = () => {
    const [form, setForm] = useState<FormData>({
        name: "",
        email: "",
        message: "",
    });
    const [status, setStatus] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [emailError, setEmailError] = useState<string>("");
    const [isVerifyingEmail, setIsVerifyingEmail] = useState<boolean>(false);
    const [formErrors, setFormErrors] = useState<FormErrors>({});

    useEffect(() => {
        if (PUBLIC_KEY) {
            emailjs.init(PUBLIC_KEY);
            console.log("EmailJS initialized successfully with key:", PUBLIC_KEY.substring(0, 8) + "...");
        } else {
            console.error("EmailJS public key is not configured. Please check your .env.local file.");
            console.error("Expected variable: NEXT_PUBLIC_EMAILJS_PUBLIC_KEY");
        }
    }, []);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;
        if (status) {
            timeoutId = setTimeout(() => {
                setStatus("");
            }, 2000);
        }
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [status]);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;
        if (Object.keys(formErrors).length > 0) {
            timeoutId = setTimeout(() => {
                setFormErrors({});
            }, 5000);
        }
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [formErrors]);

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };

    const verifyEmailExists = async (email: string) => {
        if (!ABSTRACT_API_KEY) {
            return { isValid: true, error: null }; // Skip verification if no API key
        }

        try {
            const response = await fetch(
                `https://emailvalidation.abstractapi.com/v1/?api_key=${ABSTRACT_API_KEY}&email=${email}`,
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                }
            );

            if (!response.ok) throw new Error("Email verification service failed");

            const data = await response.json();
            return {
                isValid:
                    data.deliverability === "DELIVERABLE" &&
                    data.is_smtp_valid?.value !== false,
                details: data,
                error: null,
            };
        } catch (error) {
            console.error("Email verification failed:", error);
            return { isValid: true, error: (error as Error).message };
        }
    };

    const handlechange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));

        if (formErrors[name as keyof FormErrors]) {
            setFormErrors((prev) => ({ ...prev, [name]: "" }));
        }

        if (name === "email") {
            if (!validateEmail(value)) {
                setEmailError(value ? "Please enter a valid email address" : "");
                return;
            }

            setEmailError("");
            setIsVerifyingEmail(true);

            // Clear previous timeout
            if ((window as unknown as { emailVerificationTimeout?: NodeJS.Timeout }).emailVerificationTimeout) {
                clearTimeout((window as unknown as { emailVerificationTimeout?: NodeJS.Timeout }).emailVerificationTimeout);
            }

            (window as unknown as { emailVerificationTimeout?: NodeJS.Timeout }).emailVerificationTimeout = setTimeout(async () => {
                const verification = await verifyEmailExists(value);
                setIsVerifyingEmail(false);
                if (verification.error) {
                    setEmailError("Unable to verify email. Please double-check your email");
                } else if (!verification.isValid) {
                    setEmailError("This email address does not exist or is not deliverable");
                } else {
                    setEmailError("");
                }
            }, 1000);
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormErrors({});

        if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
            setFormErrors({
                config: "EmailJS is not properly configured. Please check your environment variables.",
            });
            return;
        }

        const errors: FormErrors = {};
        if (form.name.trim().length < 2) {
            errors.name = "Name must be at least 2 characters.";
        }
        if (!form.email) {
            errors.email = "Email is required.";
        } else if (!validateEmail(form.email)) {
            errors.email = "Please enter a valid email address.";
        }
        if (isVerifyingEmail) {
            errors.email = "Please wait while we verify your email.";
        }
        if (emailError) {
            errors.email = emailError;
        }
        if (!form.message.trim()) {
            errors.message = "Message is required.";
        }

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        setIsSubmitting(true);
        emailjs
            .send(
                SERVICE_ID,
                TEMPLATE_ID,
                {
                    from_name: form.name,
                    from_email: form.email,
                    message: form.message,
                },
                PUBLIC_KEY
            )
            .then(
                (response) => {
                    console.log("SUCCESS!", response.status, response.text);
                    setForm({ name: "", email: "", message: "" });
                    toast.success("Your response has been submitted successfully");
                    setIsSubmitting(false);
                },
                (error) => {
                    console.error("FAILED...", error);
                    toast.error("Submission failed. Please try again later.");
                    setIsSubmitting(false);
                }
            );
    };

    const alphaKeyFilter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const allowedKeys = [
            "Backspace",
            "Tab",
            "Enter",
            "ArrowLeft",
            "ArrowRight",
            "Delete",
            " ",
        ];
        if (!/^[a-zA-Z]$/.test(e.key) && !allowedKeys.includes(e.key)) {
            e.preventDefault();
        }
    };

    const pasteFilter = (e: React.ClipboardEvent<HTMLInputElement>) => {
        const pastedText = e.clipboardData.getData("Text");
        if (/[^a-zA-Z ]/.test(pastedText)) {
            e.preventDefault();
        }
    };

    return (
        <div className='min-h-screen p-6'>
            <div className='flex items-center gap-2 flex-wrap justify-center  '>
                <Image src={pinkdiamond} alt='' className='w-6 h-6' />
                <div className='font-clash font-[600] text-3xl uppercase '>Reach out to us</div>
            </div>
            <div className='font-urbanist font-[600] text-[#969696] md:w-100 w-85  pt-4  mx-auto  '>Feel free to ask any query related to our products and any additional help we will be happy to help you out.</div>

            <div className='font-urbanist text-[#E1FF01] font-[600] text-xl  pt-4 text-center mx-auto'>Email</div>
            <div className='font-urbanist font-[600] text-[#969696] mt-3 text-center mx-auto'>hi@festbuzz.in </div>
            <div className='font-urbanist font-[600] text-[#969696] text-center mx-auto '>thefestbuzzgmail.com</div>

            <div className='flex justify-between w-40 content-center mt-10 mx-auto'>

                <Link href={'mailto:partner@festbuzz.in'}>   <Image src={fb} alt='' className='w-6 h-6' /></Link>
                <Link href={'https://www.instagram.com/festbuzz.in/'} target='_blank'>  <Image src={insta} alt='' className='w-6 h-6' /></Link>
                <Link href={'https://www.linkedin.com/company/festbuzz/'} target='_blank'>  <Image src={linkedin} alt='' className='w-6 h-6' /></Link>
            </div>

            <div className='flex items-center gap-2 flex-wrap mt-10 justify-center'>
                <Image src={pinkdiamond} alt='' className='w-6 h-6' />
                <div className='font-clash font-[600] text-3xl uppercase '>Get in touch</div>
            </div>

            <form onSubmit={handleSubmit} className='md:w-120 w-85 mb-40 text-center mx-auto '>
                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handlechange}
                    onKeyDown={alphaKeyFilter}
                    onPaste={pasteFilter}
                    placeholder='Your full name'
                    className='mt-4 bg-[#1D1D1D] w-full h-14 rounded-2xl pl-5 font-urbanist text-[white] placeholder:text-[#565656]'
                />
                {formErrors.name && (
                    <div className='text-red-500 text-sm mt-1 font-urbanist'>{formErrors.name}</div>
                )}

                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handlechange}
                    placeholder='Your email'
                    className='mt-4 bg-[#1D1D1D] w-full h-14 rounded-2xl pl-5 font-urbanist text-[white] placeholder:text-[#565656]'
                />
                {(formErrors.email || emailError) && (
                    <div className='text-red-500 text-sm mt-1 font-urbanist'>{formErrors.email || emailError}</div>
                )}
                {isVerifyingEmail && (
                    <div className='text-yellow-500 text-sm mt-1 font-urbanist'>Verifying email...</div>
                )}

                <input
                    type="text"
                    name="message"
                    value={form.message}
                    onChange={handlechange}
                    placeholder='Your message'
                    className='mt-4 bg-[#1D1D1D] w-full h-40 rounded-2xl pl-5 font-urbanist text-[white] placeholder:text-[#565656]'
                />
                {formErrors.message && (
                    <div className='text-red-500 text-sm mt-1 font-urbanist'>{formErrors.message}</div>
                )}

                {formErrors.config && (
                    <div className='text-red-500 text-sm mt-2 font-urbanist'>{formErrors.config}</div>
                )}

                <button
                    type="submit"
                    disabled={isSubmitting || isVerifyingEmail}
                    className='mt-4 bg-[#0248F7] px-6 py-2 font-[700] text-center rounded-2xl font-urbanist text-[#E1FF01] disabled:opacity-50 disabled:cursor-not-allowed'
                >
                    {isSubmitting ? "Sending..." : "Send ↗"}
                </button>
            </form>

            <div className='flex w-full md:justify-around content-center flex-wrap mt-25 md:gap-4 justify-center  '>
                <div className='flex justify-center content-center flex-wrap gap-1 '>
                    <Image src={whiteDiamond} className=' object-cover md:h-8 md:w-8 h-5 w-5 ' alt='' />
                    <div className='font-clash md:text-4xl text-[#E1FF01] font-[600] uppercase '>FEST</div>
                    <div className='font-clash md:text-4xl text-[#FD3EB5] font-[600] uppercase '>BUZZ</div>
                </div>
                <div className='flex justify-center content-center flex-wrap gap-1 '>
                    <Image src={whiteDiamond} className=' object-cover md:h-8 md:w-8 h-5 w-5 ' alt='' />
                    <div className='font-clash md:text-4xl text-[#E1FF01] font-[600] uppercase '>FEST</div>
                    <div className='font-clash md:text-4xl text-[#FD3EB5] font-[600] uppercase '>BUZZ</div>
                </div>
                <div className='flex justify-center content-center flex-wrap gap-1 md:w-auto w-0 overflow-hidden '>
                    <Image src={whiteDiamond} className=' object-cover md:h-8 md:w-8 h-5 w-5 ' alt='' />
                    <div className='font-clash md:text-4xl text-[#E1FF01] font-[600] uppercase '>FEST</div>
                    <div className='font-clash md:text-4xl text-[#FD3EB5] font-[600] uppercase '>BUZZ</div>
                </div>
                <div className='flex justify-center content-center flex-wrap gap-1  md:w-auto w-0 overflow-hidden'>
                    <Image src={whiteDiamond} className=' object-cover md:h-8 md:w-8 w-5 h-5 ' alt='' />
                    <div className='font-clash md:text-4xl text-[#E1FF01] font-[600] uppercase '>FEST</div>
                    <div className='font-clash md:text-4xl text-[#FD3EB5] font-[600] uppercase '>BUZZ</div>
                </div>
                <div className='flex justify-center content-center flex-wrap gap-1 md:w-auto w-0 overflow-hidden '>
                    <Image src={whiteDiamond} className=' object-cover md:h-8 md:w-8 ' alt='' />
                    <div className='font-clash md:text-4xl text-[#E1FF01] font-[600] uppercase '>FEST</div>
                    <div className='font-clash md:text-4xl text-[#FD3EB5] font-[#FD3EB5] font-[600] uppercase '>BUZZ</div>
                </div>
            </div>
            <CallToAction />
            <ToastContainer />
        </div>
    )
}

export default ContactPage
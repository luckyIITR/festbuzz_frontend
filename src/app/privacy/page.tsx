'use client'
import React from 'react'
import Image from 'next/image'
import CallToAction from '../components/CallToAction'
import whiteDiamond from '../../../public/assets/WhiteDiamond.png'
import pinkdiamond from '../../../public/assets/PinkDiamond.png'

const page = () => {
    return (
        <div className='min-h-screen p-6  text-white'>
            {/* Header Section */}
            <div className='flex items-center gap-2 flex-wrap justify-center mb-8'>
                <Image src={pinkdiamond} alt='' className='w-6 h-6' />
                <div className='font-clash font-[600] text-3xl uppercase'>Terms and Conditions</div>
            </div>

            {/* Subtitle */}
            <div className='font-urbanist font-[600] text-[#969696] max-w-4xl mx-auto text-center mb-12'>
                Feel free to ask any query related to our products and any additional help we will be happy to help you out.
            </div>

            {/* Terms Content */}
            <div className='max-w-6xl mx-auto'>
                <div className=' rounded-lg p-8 mb-8'>
                    <h1 className='text-2xl font-bold mb-4 text-[#E1FF01]'>Privacy Policy</h1>
                    <p className='text-sm text-gray-300 mb-6'>Last Updated: 1st September 2025</p>

                    <section className='mb-8'>
                        <h2 className='text-xl font-semibold mb-4 text-[#FD3EB5]'>1. Introduction</h2>
                        <p className='text-gray-200 leading-relaxed mb-4'>
                            This Privacy Policy describes how Maxhilaration Ventures (operating as Festbuzz) and its affiliates (collectively &quot;Company&quot;, &quot;we&quot;, &quot;our&quot;, &quot;us&quot;) collect, use, share, protect, or otherwise process your information/personal data through our website www.festbuzz.in (hereinafter referred to as the &quot;Platform&quot;).
                        </p>
                        <p className='text-gray-200 leading-relaxed mb-4'>
                            Please note that you may browse certain sections of the Platform without registering with us. We do not offer any product/service under this Platform outside India, and your personal data will primarily be stored and processed in India.
                        </p>
                        <p className='text-gray-200 leading-relaxed'>
                            By visiting the Platform, providing your information, or availing of any product/service offered, you expressly agree to be bound by the terms and conditions of this Privacy Policy, the Terms of Use, and any applicable service/product-specific terms and conditions. You also agree to be governed by the laws of India, including those applicable to data protection and privacy. If you do not agree, please do not use or access our Platform.
                        </p>
                    </section>

                    <section className='mb-8'>
                        <h2 className='text-xl font-semibold mb-4 text-[#FD3EB5]'>2. Collection of Information</h2>
                        <p className='text-gray-200 leading-relaxed mb-4'>We collect your personal data when you:</p>
                        <ul className='list-disc pl-6 mb-4 text-gray-200'>
                            <li>Use our Platform and services,</li>
                            <li>Interact with us during the course of our relationship, or</li>
                            <li>Provide related information from time to time.</li>
                        </ul>
                        <p className='text-gray-200 leading-relaxed mb-4'>The data collected may include (but is not limited to):</p>
                        <ul className='list-disc pl-6 mb-4 text-gray-200 space-y-2'>
                            <li><strong>Basic Personal Information:</strong> Name, date of birth, address, mobile/telephone number, email ID, etc.</li>
                            <li><strong>Identity/Verification Data:</strong> Proof of identity or address.</li>
                            <li><strong>Sensitive Personal Data (with your consent):</strong> Bank account details, debit/credit card information, payment instrument details, biometric information (e.g., facial features or physiological details for certain features).</li>
                            <li><strong>Behavioural Data:</strong> Preferences, browsing activity, and information provided during usage of the Platform.</li>
                            <li><strong>Transactional Data:</strong> Details of transactions conducted on our Platform or with third-party partners.</li>
                        </ul>
                        <p className='text-gray-200 leading-relaxed mb-4'>
                            When personal data is collected directly by a third-party business partner, their privacy policy will govern such data collection. We encourage you to review their privacy policies before sharing any information.
                        </p>
                        <div className='bg-red-900/30 border border-red-500 rounded-lg p-4 mb-4'>
                            <p className='text-red-200'>
                                <strong>⚠️ Warning:</strong> If you receive a call, email, or message from anyone claiming to collect sensitive information such as debit/credit card PINs, net-banking, or OTPs, do not share such details. Report it immediately to the concerned law enforcement agency.
                            </p>
                        </div>
                    </section>

                    <section className='mb-8'>
                        <h2 className='text-xl font-semibold mb-4 text-[#FD3EB5]'>3. Use of Information</h2>
                        <p className='text-gray-200 leading-relaxed mb-4'>
                            We use personal data to provide and enhance the services you request. Usage includes but is not limited to:
                        </p>
                        <ul className='list-disc pl-6 mb-4 text-gray-200 space-y-1'>
                            <li>Assisting sellers/business partners in handling and fulfilling orders,</li>
                            <li>Enhancing customer experience,</li>
                            <li>Resolving disputes and troubleshooting issues,</li>
                            <li>Sending updates about offers, products, services (online and offline),</li>
                            <li>Personalising your experience,</li>
                            <li>Fraud detection, prevention, and security monitoring,</li>
                            <li>Enforcing our terms and conditions,</li>
                            <li>Conducting research, analysis, and surveys,</li>
                            <li>Marketing and promotional activities (with opt-out options).</li>
                        </ul>
                        <p className='text-gray-200 leading-relaxed'>
                            Failure to provide necessary permissions may affect your access to certain services/features on the Platform.
                        </p>
                    </section>

                    <section className='mb-8'>
                        <h2 className='text-xl font-semibold mb-4 text-[#FD3EB5]'>4. Sharing of Information</h2>
                        <p className='text-gray-200 leading-relaxed mb-4'>We may share your personal data with:</p>
                        <ul className='list-disc pl-6 mb-4 text-gray-200 space-y-2'>
                            <li><strong>Internal Entities:</strong> Group companies, affiliates, and subsidiaries.</li>
                            <li><strong>Business Partners &amp; Sellers:</strong> To provide you with services and products.</li>
                            <li><strong>Third-Party Service Providers:</strong> Logistics partners, payment gateways, reward program providers, and technology vendors.</li>
                            <li><strong>Government or Law Enforcement Agencies:</strong> Where required by law, legal processes, or to protect the rights, safety, and property of our users or the public.</li>
                        </ul>
                        <p className='text-gray-200 leading-relaxed mb-4'>Disclosures may be made to:</p>
                        <ul className='list-disc pl-6 mb-4 text-gray-200'>
                            <li>Enforce Terms of Use or Privacy Policy,</li>
                            <li>Address claims of rights infringement, or</li>
                            <li>Prevent, detect, investigate fraudulent or illegal activities.</li>
                        </ul>
                    </section>

                    <section className='mb-8'>
                        <h2 className='text-xl font-semibold mb-4 text-[#FD3EB5]'>5. Security Precautions</h2>
                        <p className='text-gray-200 leading-relaxed mb-4'>
                            We adopt reasonable security practices and procedures to protect personal data against unauthorised access, misuse, loss, or disclosure.
                        </p>
                        <ul className='list-disc pl-6 mb-4 text-gray-200'>
                            <li>Secure servers and encryption are used where applicable.</li>
                            <li>However, data transmission over the internet cannot be guaranteed to be fully secure.</li>
                            <li>Users are responsible for maintaining the confidentiality of their login credentials.</li>
                        </ul>
                    </section>

                    <section className='mb-8'>
                        <h2 className='text-xl font-semibold mb-4 text-[#FD3EB5]'>6. Data Retention &amp; Deletion</h2>
                        <ul className='list-disc pl-6 mb-4 text-gray-200 space-y-2'>
                            <li>You may delete your account anytime via Profile → Settings on our Platform or by contacting us.</li>
                            <li>Upon deletion, all related data will be permanently removed, except in cases of pending grievances, claims, or ongoing services.</li>
                            <li>Data may be retained (in anonymised form) for research, analytics, fraud prevention, and legal compliance purposes.</li>
                        </ul>
                    </section>

                    <section className='mb-8'>
                        <h2 className='text-xl font-semibold mb-4 text-[#FD3EB5]'>7. Your Rights</h2>
                        <p className='text-gray-200 leading-relaxed mb-4'>You may:</p>
                        <ul className='list-disc pl-6 mb-4 text-gray-200'>
                            <li>Access, rectify, or update your personal data through the Platform,</li>
                            <li>Request account deletion,</li>
                            <li>Withdraw consent for data usage (by writing to our Grievance Officer).</li>
                        </ul>
                    </section>

                    <section className='mb-8'>
                        <h2 className='text-xl font-semibold mb-4 text-[#FD3EB5]'>8. Consent</h2>
                        <p className='text-gray-200 leading-relaxed mb-4'>
                            By using the Platform or providing your information, you consent to the collection, storage, use, disclosure, and processing of your data in accordance with this Privacy Policy.
                        </p>
                        <p className='text-gray-200 leading-relaxed mb-4'>
                            If you provide us with personal data of third parties, you confirm you have the necessary authority to do so.
                        </p>
                        <p className='text-gray-200 leading-relaxed mb-4'>
                            You may withdraw your consent by contacting our Grievance Officer. Please note:
                        </p>
                        <ul className='list-disc pl-6 mb-4 text-gray-200'>
                            <li>Withdrawal of consent is not retrospective.</li>
                            <li>Some services may be restricted or unavailable if consent is withdrawn.</li>
                        </ul>
                    </section>

                    <section className='mb-8'>
                        <h2 className='text-xl font-semibold mb-4 text-[#FD3EB5]'>9. Updates to this Privacy Policy</h2>
                        <p className='text-gray-200 leading-relaxed'>
                            We may update this Privacy Policy periodically to reflect changes in our practices. Significant changes will be notified to you as required under applicable laws.
                        </p>
                    </section>

                    <section className='mb-8'>
                        <h2 className='text-xl font-semibold mb-4 text-[#FD3EB5]'>10. Contact Us</h2>
                        <p className='text-gray-200 leading-relaxed mb-4'>
                            If you have any questions, concerns, or requests regarding this Privacy Policy, please contact us:
                        </p>
                        <div className=' rounded-lg p-4 text-gray-200'>
                            <p className='mb-2'><strong>Maxhilaration Ventures (operating as Festbuzz)</strong></p>
                            <p className='mb-2'><strong>Website:</strong> www.festbuzz.in</p>
                            <p className='mb-2'><strong>Email:</strong> hello@festbuzz.in</p>
                            <p className='mb-2'><strong>Registered Address:</strong> New Sojan Road, Mahroni, Lalitpur, Uttar Pradesh 284405, India</p>
                            <p className='mb-2'><strong>Grievance Officer:</strong> Nitin Sahu</p>
                            <p><strong>Phone:</strong> 7424961628</p>
                        </div>
                    </section>
                </div>
            </div>

            {/* Brand Logo Repetition Section */}
            <div className='flex w-full justify-center items-center flex-wrap mt-20 gap-8 mb-12'>
                <div className='flex justify-center items-center flex-wrap gap-1'>
                    <Image src={whiteDiamond} className='object-cover md:h-8 md:w-8 h-5 w-5' alt='' />
                    <div className='font-clash md:text-4xl text-2xl text-[#E1FF01] font-[600] uppercase'>FEST</div>
                    <div className='font-clash md:text-4xl text-2xl text-[#FD3EB5] font-[600] uppercase'>BUZZ</div>
                </div>
                <div className='flex justify-center items-center flex-wrap gap-1'>
                    <Image src={whiteDiamond} className='object-cover md:h-8 md:w-8 h-5 w-5' alt='' />
                    <div className='font-clash md:text-4xl text-2xl text-[#E1FF01] font-[600] uppercase'>FEST</div>
                    <div className='font-clash md:text-4xl text-2xl text-[#FD3EB5] font-[600] uppercase'>BUZZ</div>
                </div>
                <div className='hidden md:flex justify-center items-center flex-wrap gap-1'>
                    <Image src={whiteDiamond} className='object-cover md:h-8 md:w-8 h-5 w-5' alt='' />
                    <div className='font-clash md:text-4xl text-2xl text-[#E1FF01] font-[600] uppercase'>FEST</div>
                    <div className='font-clash md:text-4xl text-2xl text-[#FD3EB5] font-[600] uppercase'>BUZZ</div>
                </div>
                <div className='hidden md:flex justify-center items-center flex-wrap gap-1'>
                    <Image src={whiteDiamond} className='object-cover md:h-8 md:w-8 h-5 w-5' alt='' />
                    <div className='font-clash md:text-4xl text-2xl text-[#E1FF01] font-[600] uppercase'>FEST</div>
                    <div className='font-clash md:text-4xl text-2xl text-[#FD3EB5] font-[600] uppercase'>BUZZ</div>
                </div>
                <div className='hidden md:flex justify-center items-center flex-wrap gap-1'>
                    <Image src={whiteDiamond} className='object-cover md:h-8 md:w-8 h-5 w-5' alt='' />
                    <div className='font-clash md:text-4xl text-2xl text-[#E1FF01] font-[600] uppercase'>FEST</div>
                    <div className='font-clash md:text-4xl text-2xl text-[#FD3EB5] font-[600] uppercase'>BUZZ</div>
                </div>
            </div>

            <CallToAction />
        </div>
    )
}

export default page
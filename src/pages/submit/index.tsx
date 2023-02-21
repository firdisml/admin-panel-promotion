import React, { useRef, useState } from 'react'
import PrimaryLayout from 'layout/PrimaryLayout'
import DatePicker, { CalendarContainer } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import ReCAPTCHA from "react-google-recaptcha";
import Head from 'next/head'
import { useSession } from 'next-auth/react';
import { getToken } from "next-auth/jwt"
import { type GetServerSideProps, type GetServerSidePropsContext } from "next";

function Index() {

    const router = useRouter()
    const MyContainer = ({ className, children }: any) => {
        return (

            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            <CalendarContainer className={className}>
                <div style={{ background: "#f0f0f0", padding: "0.5rem" }} className="rounded-md font-mono">
                </div>
                <div className='font-mono' style={{ position: "relative", paddingTop: "-10rem" }}>{children}</div>
            </CalendarContainer>
        );
    };
    const { data: session, status } = useSession()
    const [loading, set_loading] = useState(false)
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;
    const [title, set_title] = useState("")
    const [category, set_category] = useState("Food & Baverage")
    const [link, set_link] = useState("")
    const [state, set_state] = useState("Selangor")
    const [shop, set_shop] = useState("")
    const [image, setImage] = useState(null);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
    const [createObjectURL, setCreateObjectURL] = useState<any>(null);
    let toast_id;
    const reRef = useRef<any>();

    const uploadToClient = (event: any) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (event.target.files && event.target.files[0]) {

            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
            const i: any = event.target.files[0];

            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            setImage(i);
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            setCreateObjectURL(URL.createObjectURL(i));
        }
    };

    const handle_submit = async (e: any) => {

        e.preventDefault()

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        const token = await reRef.current?.executeAsync();
        console.log(token)
        reRef.current.reset();
        set_loading(true)
        toast_id = toast.loading("Submitting");

        try {

            const response = await axios.post("https://go-mongo-promotion-production.up.railway.app/api/promotions",
                {
                    "title": title,
                    "category": category,
                    "description": "Test",
                    "link": link,
                    "shop": shop,
                    "image": image,
                    "state": state,
                    "visible": false,
                    "start": startDate,
                    "end": endDate,
                    "g-recaptcha-response": token
                }, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            console.log(response)

            toast.update(toast_id, {
                render: "Submission Success",
                type: "success",
                isLoading: false,
                autoClose: 3000,
            });
            router.push('/hidden')

        } catch (error) {
            toast.update(toast_id, {
                render: "Submission Error",
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });
            set_loading(false)
        }


    }


    return (
        <>
            <Head>
                <title>Sasaje | Deals Grabber </title>
            </Head>
            <PrimaryLayout status={status}>
                <div className="px-4 py-4 sm:px-0">
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
                        <form className="px-4 py-5 sm:p-6" onSubmit={handle_submit}>
                            <ReCAPTCHA sitekey='6Lfds48kAAAAAEeYku0Py2NC-g65FbfMJBuRqCmr' size='invisible' ref={reRef} />
                            <div className="col-span-6">
                                <label
                                    htmlFor="title"
                                    className="block flex text-sm font-medium"
                                >
                                    Title
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    maxLength={30}
                                    id="title"
                                    onChange={(e) => (set_title(e.currentTarget.value))}
                                    required
                                    disabled={loading}
                                    placeholder="Promotion's Title"
                                    className="mt-2 block w-full rounded-md border border-gray-300 shadow-sm sm:text-sm"
                                />
                            </div>
                            <div className="col-span-6 mt-5">
                                <label htmlFor="country" className="block text-sm font-medium">Category</label>
                                <select id="category" disabled={loading} name="category" onChange={(e) => { set_category(e.currentTarget.value) }} className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                    <option>Food & Beverage</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            <div className="col-span-6 mt-5">
                                <label
                                    htmlFor="link"
                                    className="block flex text-sm font-medium"
                                >
                                    Link
                                </label>
                                <input
                                    type="text"
                                    name="link"
                                    disabled={loading}
                                    onChange={(e) => (set_link(e.currentTarget.value))}
                                    id="link"
                                    placeholder="Promotion's Link"
                                    className="mt-2 block w-full rounded-md border border-gray-300 shadow-sm sm:text-sm"
                                />
                            </div>
                            <div className="col-span-6 mt-5">
                                <label
                                    htmlFor="link"
                                    className="block flex text-sm font-medium"
                                >
                                    Shop
                                </label>
                                <input
                                    type="text"
                                    maxLength={30}
                                    disabled={loading}
                                    name="link"
                                    id="link"
                                    onChange={(e) => (set_shop(e.currentTarget.value))}
                                    placeholder="Promotion's Shop"
                                    className="mt-2 block w-full rounded-md border border-gray-300 shadow-sm sm:text-sm"
                                />
                            </div>
                            <div className="col-span-6 sm:col-span-3 mt-5">
                                <label htmlFor="country" className="block text-sm font-medium">State</label>
                                <select disabled={loading} id="state" name="state" onChange={(e) => (set_state(e.currentTarget.value))} className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                    <option>Selangor</option>
                                    <option>Kuala Lumpur</option>
                                    <option>All States</option>
                                </select>
                            </div>

                            <div className="col-span-6 sm:col-span-3 mt-5">
                                <label htmlFor="country" className="block text-sm font-medium">Duration</label>
                                <DatePicker
                                    selectsRange={true}
                                    startDate={startDate}
                                    className="mt-1 block w-full font-mono rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    endDate={endDate}
                                    onChange={(update: any) => {
                                        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                                        setDateRange(update);
                                    }}
                                    placeholderText="Promotion's Duration"
                                    calendarContainer={MyContainer}
                                    autoComplete='nope'
                                    withPortal
                                    readOnly={loading}
                                />
                            </div>

                            <div className="col-span-6 sm:col-span-3 mt-5">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload Picture</label>
                                <input accept="image/*" disabled={loading} onChange={uploadToClient} required className="block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" />
                            </div>

                            <div className="col-span-6 sm:col-span-3 mt-5">

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex flex-col items-center w-full px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Submit Promotion
                                </button>

                            </div>



                        </form>
                    </div>
                </div>
            </PrimaryLayout>
        </>
    )
}

export default Index

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {

    const { req } = ctx;

    const token = await getToken({ req, raw: true })

    if (!token) return { redirect: { statusCode: 307, destination: "/" } };

    return { props: { token: token } };

};
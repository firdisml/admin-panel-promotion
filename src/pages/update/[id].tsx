import React, { useState } from 'react'
import PrimaryLayout from 'layout/PrimaryLayout'
import { useSession } from 'next-auth/react'
import { getToken } from "next-auth/jwt"
import { type GetServerSideProps, type GetServerSidePropsContext } from "next";
import DatePicker, { CalendarContainer } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import Head from 'next/head'
import { useQuery } from 'react-query';
import { DateTime } from 'luxon';


const fetch_promotion = async (token: string, param: string) => {
    const fetch_transactions_count = await axios.get(
        `https://go-mongo-promotion-production.up.railway.app/api/promotions/${param}`,
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        }
    );

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return fetch_transactions_count.data;
};



function Index(props: any) {
    const { data: session, status } = useSession()
    const router = useRouter()
    const param = router.query.id

    const MyContainer = ({ className, children }: any) => {
        return (

            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            <CalendarContainer className={className}>
                <div style={{ background: "#f0f0f0", padding: "0.5rem" }} className="rounded-md font-mono">
                </div>
                <div className='font-mono' style={{ position: "relative" }}>{children}</div>
            </CalendarContainer>
        );
    };
    const [loading, set_loading] = useState(false)
    const [title, set_title] = useState("")
    const [category, set_category] = useState("Food & Baverage")
    const [link, set_link] = useState("")
    const [state, set_state] = useState("Selangor")
    const [shop, set_shop] = useState("")
    const [image, setImage] = useState(null);
    const [start_date, set_start_date] = useState();
    const [end_date, set_end_date] = useState();
    const [image_update, set_image_update] = useState(false)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
    const [createObjectURL, setCreateObjectURL] = useState<any>(null);
    let toast_id;


    const { isLoading, isFetching } = useQuery(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        ["promotions", props.token, param],
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        () => fetch_promotion(props.token, param),
        {
            onSuccess: (data) => {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
                set_title(data?.data?.data?.title)
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
                set_category(data?.data?.data?.category)
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
                set_link(data?.data?.data?.link)
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
                set_state(data?.data?.data?.state)
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
                set_shop(data?.data?.data?.shop)
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
                set_start_date(DateTime.fromISO(data?.data?.data?.start).toJSDate())
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
                set_end_date(DateTime.fromISO(data?.data?.data?.end).toJSDate())
            },
        }
    );


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

        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        e.preventDefault()

        set_loading(true)
        toast_id = toast.loading("Submitting");

        const data = new FormData();

        data.append('title', title);
        data.append('category', category);
        data.append('link', link);
        data.append('shop', shop);
        data.append('state', state);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        /* @ts-ignore */
        data.append('image', image);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        /* @ts-ignore */
        data.append('start', new Date(start_date).toISOString());
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        /* @ts-ignore */
        data.append('end', new Date(end_date).toISOString());
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        /* @ts-ignore */
        data.append('visible', false);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        /* @ts-ignore */
        data.append('picture', image_update);

        try {
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            await axios.patch(`https://go-mongo-promotion-production.up.railway.app/api/promotions/${param}`,
                data, {
                headers: {
                    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions, @typescript-eslint/no-unsafe-member-access
                    'Authorization': `Bearer ${props.token}`,
                    'Content-Type': 'multipart/form-data',
                }
            })
            toast.update(toast_id, {
                render: "Update Success",
                type: "success",
                isLoading: false,
                autoClose: 3000,
            });

            void router.push('/hidden')
        } catch (error) {
            toast.update(toast_id, {
                render: "Update Error",
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });
            console.log(error)
            set_loading(false)
        }


    }
    return (
        <PrimaryLayout status={status}>
            <div className="px-4 py-4 sm:px-0">
                <div className="bg-white overflow-hidden shadow rounded-lg">
                    {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
                    <form className="px-4 py-5 sm:p-6" onSubmit={handle_submit}>
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
                                value={title}
                                id="title"
                                onChange={(e) => (set_title(e.currentTarget.value))}
                                required
                                disabled={loading || isLoading || isFetching}
                                placeholder="Promotion's Title"
                                className="mt-2 block w-full rounded-md border border-gray-300 shadow-sm sm:text-sm"
                            />
                        </div>
                        <div className="col-span-6 mt-5">
                            <label htmlFor="country" className="block text-sm font-medium">Category</label>
                            <select id="category" value={category} disabled={loading || isLoading || isFetching} name="category" onChange={(e) => { set_category(e.currentTarget.value) }} className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
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
                                disabled={loading || isLoading || isFetching}
                                value={link}
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
                                value={shop}
                                disabled={loading || isLoading || isFetching}
                                name="link"
                                id="link"
                                onChange={(e) => (set_shop(e.currentTarget.value))}
                                placeholder="Promotion's Shop"
                                className="mt-2 block w-full rounded-md border border-gray-300 shadow-sm sm:text-sm"
                            />
                        </div>
                        <div className="col-span-6 sm:col-span-3 mt-5">
                            <label htmlFor="country" className="block text-sm font-medium">State</label>
                            <select disabled={loading || isLoading || isFetching} value={state} id="state" name="state" onChange={(e) => (set_state(e.currentTarget.value))} className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                <option>Selangor</option>
                                <option>Kuala Lumpur</option>
                                <option>All States</option>
                            </select>
                        </div>

                        <div className="col-span-6 sm:col-span-3 mt-5">
                            <label htmlFor="country" className="block text-sm font-medium">Start Date</label>
                            <DatePicker
                                selected={start_date}
                                calendarContainer={MyContainer}
                                dateFormat="MM/dd/yyyy"
                                className="mt-1 block w-full font-mono rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                /*@ts-ignore */
                                onChange={(date) => set_start_date(date)}
                                placeholderText="Promotion's Start Date"
                                withPortal
                                readOnly={loading || isLoading || isFetching}
                            />
                        </div>

                        <div className="col-span-6 sm:col-span-3 mt-5">
                            <label htmlFor="country" className="block text-sm font-medium">End Date</label>
                            <DatePicker
                                selected={end_date}
                                calendarContainer={MyContainer}
                                className="mt-1 block w-full font-mono rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                /*@ts-ignore */
                                onChange={(date) => set_end_date(date)}
                                placeholderText="Promotion's End Date"
                                withPortal
                                readOnly={loading || isLoading || isFetching}
                            />
                        </div>

                        <div className="col-span-6 sm:col-span-3 mt-5 flex gap-x-2">

                            <button
                                type='button'
                                onClick={() => set_image_update(!image_update)}
                                disabled={loading}
                                className="flex items-center px-4 w-full py-3 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Update Picture
                            </button>
                            <button
                                type='button'
                                disabled={loading}
                                className="flex items-center w-full px-4 py-3 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                View Picture
                            </button>
                        </div>

                        {image_update ? (<div className="col-span-6 sm:col-span-3 mt-5">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload Picture</label>
                            <input accept="image/*" disabled={loading} onChange={uploadToClient} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" />
                        </div>
                        ) : null}
                        <div className="col-span-6 sm:col-span-3 mt-5">

                            <button
                                type="submit"
                                disabled={loading}
                                className="flex flex-col items-center w-full px-4 py-3 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Update Promotion
                            </button>
                        </div>
                        <div className="col-span-6 sm:col-span-3 mt-5">

                            <button
                                type="button"
                                disabled={loading}
                                className="flex flex-col items-center w-full px-4 py-3 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Delete Promotion
                            </button>
                        </div>
                        <div className="col-span-6 sm:col-span-3 mt-5">

                            <button
                                type="button"
                                disabled={loading}
                                className="flex flex-col items-center w-full px-4 py-3 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Approved Promotion
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </PrimaryLayout>
    )
}

export default Index

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {

    const { req } = ctx;

    const token = await getToken({ req, raw: true })

    if (!token) return { redirect: { statusCode: 307, destination: "/" } };

    return { props: { token: token } };

};
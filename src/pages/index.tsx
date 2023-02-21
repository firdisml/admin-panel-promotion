import { type FormEvent, useState } from "react"
import { signIn } from "next-auth/react"
export default function Index() {

    const [email, set_email] = useState()
    const [password, set_password] = useState()

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    const signin_handler = async (e: FormEvent<HTMLFormElement>) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        e.preventDefault()

        await signIn("credentials", {
            email: email,
            password: password,
            callbackUrl: '/dashboard'
        })  

    }

    return (
        <>
            <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <picture>
                        <img
                            className="mx-auto h-12 w-auto"
                            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                            alt="Workflow"
                        />
                    </picture>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Admin Panel Sign In </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Credential only available for admins
                    </p>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 mx-4 border border-gray-300  rounded-md sm:px-10">
                        <form className="space-y-6" onSubmit={
                            (e) => {
                                void (async () => {
                                    await signin_handler(e);
                                })();
                            }
                        }>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email Address
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="email"
                                        name="email"
                                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                        /* @ts-ignore */
                                        onChange={(e) => { set_email(e.currentTarget.value) }}
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                        /* @ts-ignore */
                                        onChange={(e) => { set_password(e.currentTarget.value) }}
                                        autoComplete="current-password"
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Sign in
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

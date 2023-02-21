import { Disclosure } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { FcLike, FcApproval, FcCancel, FcBusinessman, FcCloseUpMode } from "react-icons/fc";
import { useRouter } from "next/router";
import Link from "next/link";
import { signIn, signOut } from "next-auth/react";



// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function PrimaryLayout(props: any) {
    const router = useRouter()
    return (
        <>
            <div className="min-h-full">
                <Disclosure as="nav" className="bg-indigo-600">
                    {({ open }) => (
                        <>
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                <div className="flex items-center justify-between h-16">
                                    <div className="flex items-center">
                                        <div className="flex flex-shrink-0">
                                            <Link href={"/"}>
                                                <picture>
                                                    <img
                                                        className="h-12 w-12 opacity-80"
                                                        src="logo.svg"
                                                        alt="Workflow"
                                                    />
                                                </picture>
                                            </Link>
                                        </div>
                                    </div>

                                    <div className="hidden md:block">
                                        <div className="ml-10 flex items-baseline space-x-4">
                                            {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
                                            {props.status === 'authenticated' ? (<button
                                                onClick={() => { void router.push('/dashboard') }}
                                                className="flex text-white bg-indigo-500 font-semibold hover:bg-opacity-75 px-3 py-2 rounded-md text-sm font-medium"
                                            >
                                                <FcCloseUpMode className="h-5 w-5 mr-2" /> Dashbaord
                                            </button>) : null}

                                            {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
                                            {props.status === 'authenticated' ? (<button
                                                onClick={() => { void router.push('/visible') }}
                                                className="flex text-white bg-indigo-500 font-semibold hover:bg-opacity-75 px-3 py-2 rounded-md text-sm font-medium"
                                            >
                                                <FcApproval className="h-5 w-5 mr-2" /> Visible
                                            </button>) : null}

                                            {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
                                            {props.status === 'authenticated' ? (<button
                                                onClick={() => { void router.push('/hidden') }}
                                                className="flex text-white bg-indigo-500 font-semibold hover:bg-opacity-75 px-3 py-2 rounded-md text-sm font-medium"
                                            >
                                                <FcCancel className="h-5 w-5 mr-2" /> Hidden
                                            </button>) : null}

                                            {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
                                            {props.status === 'authenticated' ? (<button
                                                onClick={() => { void router.push('/submit') }}
                                                className="flex text-white bg-indigo-500 font-semibold hover:bg-opacity-75 px-3 py-2 rounded-md text-sm font-medium"
                                            >
                                                <FcLike className="h-5 w-5 mr-2" /> Submit
                                            </button>) : null}
                                            {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
                                            {props.status === 'authenticated' ? (<button
                                                onClick={() => { void signOut() }}
                                                className="flex text-white bg-indigo-500 font-semibold hover:bg-opacity-75 px-3 py-2 rounded-md text-sm font-medium"
                                            >
                                                <FcBusinessman className="h-5 w-5 mr-2" /> Sign Out
                                            </button>) : (<button
                                                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                                                onClick={() => signIn()}
                                                className="flex text-white bg-indigo-500 font-semibold hover:bg-opacity-75 px-3 py-2 rounded-md text-sm font-medium"
                                            >
                                                <FcBusinessman className="h-5 w-5 mr-2" /> Sign In
                                            </button>)}

                                        </div>
                                    </div>
                                    <div className="-mr-2 flex md:hidden">
                                        {/* Mobile menu button */}
                                        <Disclosure.Button className="bg-indigo-600 inline-flex items-center justify-center p-2 rounded-md text-indigo-200 hover:text-white hover:bg-indigo-500 hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white">
                                            <span className="sr-only">Open main menu</span>
                                            {open ? (
                                                <XIcon className="block h-6 w-6" aria-hidden="true" />
                                            ) : (
                                                <MenuIcon
                                                    className="block h-6 w-6"
                                                    aria-hidden="true"
                                                />
                                            )}
                                        </Disclosure.Button>
                                    </div>
                                </div>
                            </div>

                            <Disclosure.Panel className="md:hidden">
                                <div className="px-2 pt-2 pb-3 space-y-4 sm:px-3">
                                    {/* eslint-disable-next-line @typescript-eslint/no-misused-promises, @typescript-eslint/no-unsafe-member-access */}
                                    {props.status === 'authenticated' ? (<Disclosure.Button
                                        onClick={() => { void router.push('/dashboard') }}
                                        as="a"
                                        className="flex text-white bg-indigo-500 hover:bg-opacity-75 block px-3 py-2 rounded-md text-base font-medium"
                                        aria-current="page"
                                    >
                                        <FcCloseUpMode className="h-5 w-5 mr-2" /> Dashboard
                                    </Disclosure.Button>) : null}

                                    {/* eslint-disable-next-line @typescript-eslint/no-misused-promises, @typescript-eslint/no-unsafe-member-access */}
                                    {props.status === 'authenticated' ? (<Disclosure.Button
                                        onClick={() => { void router.push('/visible') }}
                                        as="a"
                                        className="flex text-white bg-indigo-500 hover:bg-opacity-75 block px-3 py-2 rounded-md text-base font-medium"
                                        aria-current="page"
                                    >
                                        <FcApproval className="h-5 w-5 mr-2" /> Visible
                                    </Disclosure.Button>) : null}
                                    {/* eslint-disable-next-line @typescript-eslint/no-misused-promises, @typescript-eslint/no-unsafe-member-access */}
                                    {props.status === 'authenticated' ? (<Disclosure.Button
                                        onClick={() => { void router.push('/hidden') }}
                                        as="a"
                                        className="flex text-white bg-indigo-500 hover:bg-opacity-75 block px-3 py-2 rounded-md text-base font-medium"
                                        aria-current="page"
                                    >
                                        <FcCancel className="h-5 w-5 mr-2" /> Hidden
                                    </Disclosure.Button>) : null}
                                    {/* eslint-disable-next-line @typescript-eslint/no-misused-promises, @typescript-eslint/no-unsafe-member-access */}
                                    {props.status === 'authenticated' ? (<Disclosure.Button
                                        onClick={() => { void router.push('/submit') }}
                                        as="a"
                                        className="flex text-white bg-indigo-500 hover:bg-opacity-75 block px-3 py-2 rounded-md text-base font-medium"
                                        aria-current="page"
                                    >
                                        <FcLike className="h-5 w-5 mr-2" /> Submit
                                    </Disclosure.Button>) : null}
                                    {/* eslint-disable-next-line @typescript-eslint/no-misused-promises, @typescript-eslint/no-unsafe-member-access */}
                                    {props.status === 'authenticated' ? (<Disclosure.Button
                                        onClick={() => { void signOut() }}
                                        as="a"
                                        className="flex text-white bg-indigo-500 hover:bg-opacity-75 block px-3 py-2 rounded-md text-base font-medium"
                                        aria-current="page"
                                    >
                                        <FcBusinessman className="h-5 w-5 mr-2" /> Sign Out
                                    </Disclosure.Button>) : (<Disclosure.Button

                                        onClick={() => { void signIn() }}
                                        as="a"
                                        className="flex text-white bg-indigo-500 hover:bg-opacity-75 block px-3 py-2 rounded-md text-base font-medium"
                                        aria-current="page"
                                    >
                                        <FcBusinessman className="h-5 w-5 mr-2" /> Sign In
                                    </Disclosure.Button>)}


                                </div>
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>
                <main>
                    <div className="max-w-7xl mx-auto pt-4 sm:px-6 lg:px-8">
                        {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
                        {props.children}
                    </div>
                </main>
            </div>
        </>
    );
}

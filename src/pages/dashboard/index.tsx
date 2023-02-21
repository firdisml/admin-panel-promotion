import React from 'react'
import PrimaryLayout from 'layout/PrimaryLayout'
import { useSession } from 'next-auth/react'
import { getToken } from "next-auth/jwt"
import { type GetServerSideProps, type GetServerSidePropsContext } from "next";
import Head from 'next/head';

function Index() {
  const { data: session, status } = useSession()

  return (
    <>
      <Head>
        <title>Sasaje Admin | Add </title>
      </Head>
      <PrimaryLayout status={status}>
        {status}
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
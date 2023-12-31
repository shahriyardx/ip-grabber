import React from "react";
import { type GetServerSidePropsContext } from "next";
import { db } from "@/server/db";

const Verify = () => {
  return (
    <div className="grid h-screen place-items-center bg-zinc-950 text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Succesfull</h1>
        <p>You can now close this window</p>
      </div>
    </div>
  );
};

export default Verify;

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const ip = context.req.headers['x-forwarded-for']
  const useragent = context.req.headers['user-agent']!
  const idx1 = useragent.indexOf("(")
  const idx2 = useragent.indexOf(")")
  const agent = useragent.substring(idx1 + 1, idx2)

  const { reqId } = context.params as { reqId: string };
  const exists = await db.registerIp.findFirst({ where: { req_id: reqId}})
  
  if (!exists) {
      await db.registerIp.create({
        data: {
          ip: ip?.toString(),
          req_id: reqId,
          fulfilled: true,
          visited: 1,
          agent,
        },
      });
  } else {
    await db.registerIp.updateMany({
        where: {
            req_id: reqId,
        },
        data: {
          agent,
          ip: ip?.toString(),
          visited: { increment: 1 }
        },
      });
  }

  return {};
};

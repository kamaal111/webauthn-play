import Head from 'next/head';

import config from '@/config';

type Props = {
  children: React.ReactNode | React.ReactNode[];
  title?: string;
};

function Page({ children, title }: Props) {
  return (
    <>
      <Head>
        <title>Web Authn Play</title>
        <meta name="description" content="Web authn play" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {title != null ? <h1 className="title">{title}</h1> : null}
        {children}
      </main>
      <footer>
        <div>
          <p>{makeCopyWriteString()}</p>
        </div>
      </footer>
    </>
  );
}

const currentDate = new Date();
const currentYear = currentDate.getFullYear();

function makeCopyWriteString() {
  let duration: string;
  if (currentYear === config.since) {
    duration = String(config.since);
  } else {
    duration = `${config.since}-${currentYear}`;
  }

  return `Ⓒ ${duration} ${config.fullName}`;
}

export default Page;

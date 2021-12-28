import Head from "next/head";
import { Fragment } from "react";
import styles from "../../styles/MainLayout.module.scss";

export default function MainLayout({ title, children }) {
  return (
    <Fragment>
      <Head>
        <meta name="theme-color" content="#303030" />
        <title>{title}</title>
        <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
      </Head>

      <main className={styles.main_container}>{children}</main>

      <footer className={styles.footer}>
        <p>&copy; Luis Sebastian Gonzalez Cordero</p>
      </footer>
    </Fragment>
  );
}

MainLayout.defaultProps = {
  title: "Rick and Morty",
};
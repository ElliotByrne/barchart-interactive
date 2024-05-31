import Logo from "@/assets/logo.png";

import styles from "./App.module.css";
import { Chart } from "./components/Chart/Chart";

export default function App() {
  return (
    <main className={styles.main} style={{ padding: "4rem" }}>
      <Chart />
    </main>
  );
}

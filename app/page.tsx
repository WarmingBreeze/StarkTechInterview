import Chart from "@/components/Chart";
import DataTable from "@/components/DataTable";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import styles from "@/css/App.module.css";

export default function App() {
    return (
        <>
            <SearchBar />
            <div className={styles.pos_header}>
                <Header />
            </div>
            <div className={styles.pos_chart}>
                <Chart />
            </div>
            <div className={styles.pos_datatable}>
                <DataTable />
            </div>
        </>
    );
}
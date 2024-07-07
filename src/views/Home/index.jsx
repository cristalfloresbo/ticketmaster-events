import { useEffect, useRef, useState } from "react";
import Navbar from "../../components/Navbar";
import Events from "../../components/Events";
import useEventsData from "../../hooks/userEventsData";
import ReactPaginate from "react-paginate";
import styles from "./Home.module.css";

const Home = () => {
    const { events, isLoading, error, fetchEvents, page } = useEventsData();
    const [searchTerm, setSearchTerm] = useState("");
    const containerRef = useRef();

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleNavbarSearch = (term) => {
        console.log(containerRef.current.setSearch(""));
        setSearchTerm(term);
        fetchEvents(`&keyword=${term}`);
    };

    const handlePageClick = ({ selected }) => {
        fetchEvents(`&keyword=${searchTerm}&page=${selected}`);
    };

    const renderEvents = () => {
        if (isLoading) {
            return <p>Cargando resultados...</p>;
        }

        if (error) {
            return <p>Ha ocurrido un error</p>;
        }

        return (
            <div>
                <Events searchTerm={searchTerm} events={events} />
                <ReactPaginate
                    className={styles.pagination}
                    nextClassName={styles.next}
                    previousClassName={styles.previous}
                    pageClassName={styles.page}
                    activeClassName={styles.activePage}
                    disabledClassName={styles.disabledPage}
                    breakLabel="..."
                    nextLabel=">"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={page.totalPages}
                    previousLabel="<"
                    renderOnZeroPageCount={null}
                />
            </div>
        );
    };

    return (
        <>
            <Navbar onSearch={handleNavbarSearch} ref={containerRef} />
            {renderEvents()}
        </>
    );
};
export default Home;
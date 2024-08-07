import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Navbar = forwardRef(({ onSearch }, ref) => {
    const [search, setSearch] = useState("");

    // useEffect(() => {
    //     console.log(`onSearch cambio`);
    // }, [onSearch]);

    // useEffect(() => {
    //     console.log("Componente renderizado");
    // }, []);

    // useEffect(() => {
    //     console.log(`search cambio`);
    // }, [search]);

    useImperativeHandle(ref, () => ({
        search,
        setSearch,
    }));

    const handleInputChange = (evt) => {
        setSearch(evt.target.value);
    };

    const handleInputKeyDown = (evt) => {
        if (evt.key === "Enter") {
            onSearch(search);
        }
    };

    return (
        // const containerRef = useRef();
        // <div ref={(el) => containerRef.current = el)}>
        <div
            ref={ref}
            style={{
                marginBottom: 14,
                width: "100%",
                display: "flex",
            }}
        >
            <div style={{ flex: 1, display: "flex" }}>
                <p>Events</p>
            </div>
            <div
                style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                }}
            >
                <input
                    placeholder="Busca tu evento favorito"
                    onChange={handleInputChange}
                    onKeyDown={handleInputKeyDown}
                    value={search}
                    style={{
                        fontSize: 16,
                        padding: "6px 12px",
                        borderRadius: 4,
                        border: "none",
                        width: 200,
                    }}
                />
                <Link
                    to="/profile/my-info"
                    style={{
                        marginLeft: 24,
                        color: "#000",
                        textDecoration: "none",
                        fontWeight: 600,
                    }}
                >
                    Mi perfil
                </Link>
            </div>
        </div>
    );
});

Navbar.displayName = "Navbar";

Navbar.propTypes = {
    onSearch: PropTypes.func.isRequired,
};

export default Navbar;

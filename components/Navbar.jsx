'use client'

import Link from "next/link";

function Navbar() {
    return (
        <>
            <nav className="navbar" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <Link className="navbar-item is-size-4" href="../">
                        BD-Util
                    </Link>

                    <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>

                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-start">
                        <Link href="../" className="navbar-item">
                            Home
                        </Link>

                        <Link href="https://github.com/CanadianBleach/bindaddy-util" target="_blank" className="navbar-item">
                            Github
                        </Link>
                        
                        <div className="navbar-item has-dropdown is-hoverable">
                            <a className="navbar-link">
                                More
                            </a>

                            <div className="navbar-dropdown">
                                <Link href="../map" className="navbar-item">
                                    Maps
                                </Link>
                                <Link href="../inactive-sort" className="navbar-item">
                                    Inactive Sort
                                </Link>
                                <a className="navbar-item">
                                    -
                                </a>
                                <hr className="navbar-divider"></hr>
                                <a className="navbar-item">
                                    -
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                                <a className="button">
                                    <strong>Sign up</strong>
                                </a>
                                <a className="button is-light">
                                    Log in
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
'use client'

import { getSession, signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

function Navbar() {
    const { data: session, status } = useSession()

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

                        {session && session.user ?
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
                                    <a href="../client-upload" className="navbar-item">
                                        Client Upload
                                    </a>
                                    <hr className="navbar-divider"></hr>
                                </div>
                            </div> : <></>
                        }
                    </div>

                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                                {session && session.user ?
                                    <div className="navbar-item has-dropdown is-hoverable">
                                        <a className="navbar-link">
                                            {session.user.name}
                                        </a>

                                        <div className="navbar-dropdown">
                                            <button onClick={() => signOut()} className="navbar-item">
                                                Sign Out
                                            </button>
                                        </div>
                                    </div> :
                                    <button onClick={() => signIn()} href="./signin" className="button is-light">
                                        Log in
                                    </button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
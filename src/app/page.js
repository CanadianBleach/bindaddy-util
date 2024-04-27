import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <section className="hero is-fullheight">
        <Navbar />
        <div className="hero-body is-flex-direction-column is-justify-content-center">
          <h1 className="title">BD-Util</h1>
        </div>
      </section>
    </>
  );
}

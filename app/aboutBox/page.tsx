type AboutBoxProps = {
    companyName: string;
    bossName: string;
};

const AboutBox = ({ companyName = "ACME", bossName = "Road Runner" }: AboutBoxProps) => {
    return (
        <section className="container my-5">
            <div className="card shadow-sm border-0">
                <div className="card-body text-center">
                    <h2 className="card-title mb-3">{companyName}</h2>
                    <p className="card-text text-muted">
                        Led by <strong>{bossName}</strong>, we specialize in crafting thoughtful, scalable solutions that empower creators and learners alike.
                        At ACME Corporation, we are committed to the relentless pursuit of innovation, delivering a comprehensive suite
                        of high-performance products to meet the needs of desert-dwelling coyotes, gravity-defying birds,
                        and all seekers of solutions to difficult problems.
                        Our mission is to empower our customers with access to an ever-expanding catalog of tactical devices,
                        including but not limited to: rocket-powered roller skates, giant rubber bands, spring-loaded boxing gloves,
                        portable holes, earthquake pills, dehydrated boulders, jet-propelled pogo sticks, do-it-yourself tornado kits,
                        iron bird seed, giant magnets, pop-up railroad trains, exploding robots, instant icicle makers, exploding tennis balls, invisible paint,
                        flying saucer kits, balloons, triple-strength anvils, boomerang grenades, dynamite-laced xylophones, self-guided missiles, time machines,
                        and the ever-popular ACME Do-It-Yourself Bridge Kit (some assembly required).
                    </p>
                    <p className="card-text text-muted">
                        If you can think of it, we have already built it.
                    </p>
                    <hr />
                    <p className="card-text">
                        <small className="text-body-secondary">Updated October 2025</small>
                    </p>
                    <div className="d-flex justify-content-center gap-3 mt-4">
                        <a href="/" className="btn btn-primary">
                            Home
                        </a>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default AboutBox;
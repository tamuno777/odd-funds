import PrimaryLink from "../Link";

const HowCTA = () => {
  return (
    <section className="px-6 py-20 lg:px-16">
      <div className="mx-auto max-w-7xl rounded-[40px] bg-gray-50 px-8 py-16 text-center md:px-16">
        <span className="text-sm font-semibold uppercase tracking-widest text-customPrimary">
          Ready to begin?
        </span>

        <h2 className="mt-4 text-3xl font-bold text-gray-900 md:text-5xl">
          Start raising funds in minutes
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-gray-500 md:text-base">
          Join thousands of people already using OddFund to support causes, emergencies, healthcare, education, and communities.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <PrimaryLink href="/signup" variant="primary">
            Create campaign
          </PrimaryLink>

          <PrimaryLink href="/campaigns" variant="secondary">
            Explore campaigns
          </PrimaryLink>
        </div>
      </div>
    </section>
  );
};

export default HowCTA;


import PrimaryLink from "../Link";

const CTASection = () => {
  return (
    <section className="px-6 pb-20 lg:px-16">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[40px] bg-customPrimary px-8 py-16 text-center text-white md:px-16">
        <span className="text-sm uppercase tracking-widest text-white/70">
          Ready to make an impact?
        </span>

        <h2 className="mt-4 text-3xl font-bold md:text-5xl">
          Start your fundraising journey today
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-white/80 md:text-base">
          Join thousands of people supporting causes, families, nonprofits, and communities around the world.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <PrimaryLink href="/signup" variant="secondary">
            Create a campaign
          </PrimaryLink>

          <PrimaryLink href="/campaigns" variant="primary">
            Explore campaigns
          </PrimaryLink>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
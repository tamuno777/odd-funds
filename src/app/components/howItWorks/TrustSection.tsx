const items = [
  {
    title: "Verified campaigns",
    desc: "We review campaigns to improve transparency and donor confidence.",
  },
  {
    title: "Secure payments",
    desc: "Donations are processed through trusted and secure payment providers.",
  },
  {
    title: "Real-time updates",
    desc: "Campaign owners can post updates and keep supporters informed.",
  },
];

const TrustSection = () => {
  return (
    <section className="bg-customPrimary py-20 px-6 text-white lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <span className="text-sm font-semibold uppercase tracking-widest text-white/70">
            Why donors trust us
          </span>

          <h2 className="mt-4 text-3xl font-bold md:text-5xl">
            Designed for safe and transparent giving
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {items.map((item, i) => (
            <div
              key={i}
              className="rounded-[30px] border border-white/10 bg-white/5 p-8 backdrop-blur-md"
            >
              <h3 className="text-xl font-semibold">
                {item.title}
              </h3>

              <p className="mt-4 text-sm leading-relaxed text-white/70">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;

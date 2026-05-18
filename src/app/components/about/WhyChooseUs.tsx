const features = [
  "Fast campaign setup",
  "Secure donations",
  "Transparent payouts",
  "Real-time campaign tracking",
  "Community-driven support",
  "Mobile-friendly experience",
];

const WhyChooseUs = () => {
  return (
    <section className="bg-gray-50 py-20 px-6 lg:px-16 w-full">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl text-center mx-auto">
          <span className="text-sm font-semibold uppercase tracking-widest text-customPrimary">
            Why choose us
          </span>

          <h2 className="mt-4 text-3xl font-bold text-gray-900 md:text-5xl">
            Everything you need to raise support online
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <div
              key={i}
              className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="mb-5 h-3 w-3 rounded-full bg-customPrimary" />

              <h3 className="text-lg font-semibold text-gray-900">
                {feature}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-gray-500">
                Designed to help campaign owners and donors connect with trust and simplicity.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
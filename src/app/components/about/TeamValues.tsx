const values = [
  {
    title: "Transparency",
    desc: "Track donations and campaign progress in real time.",
  },
  {
    title: "Community",
    desc: "Bringing people together around meaningful causes.",
  },
  {
    title: "Impact",
    desc: "Helping every contribution create measurable change.",
  },
];

const TeamValues = () => {
  return (
    <section className="py-20 px-6 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-customPrimary">
            Our Values
          </span>

          <h2 className="mt-4 text-3xl font-bold text-gray-900 md:text-5xl">
            Built around trust and human connection
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {values.map((value, i) => (
            <div
              key={i}
              className="rounded-3xl border border-gray-100 p-8 transition-all duration-300 hover:border-customPrimary/20 hover:bg-customPrimary/5"
            >
              <h3 className="text-xl font-semibold text-gray-900">
                {value.title}
              </h3>

              <p className="mt-4 text-sm leading-relaxed text-gray-500">
                {value.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamValues;
const flows = [
  {
    title: "Start your fundraiser",
    desc: "Create a campaign with your story, fundraising goal, and supporting media.",
  },
  {
    title: "Receive community support",
    desc: "People donate securely and share your campaign with others.",
  },
  {
    title: "Withdraw funds easily",
    desc: "Receive payouts directly to your preferred account quickly and safely.",
  },
];

const DonationFlow = () => {
  return (
    <section className="py-20 px-6 lg:px-16">
      <div className="mx-auto max-w-5xl text-center">
        <span className="text-sm font-semibold uppercase tracking-widest text-customPrimary">
          Donation flow
        </span>

        <h2 className="mt-4 text-3xl font-bold text-gray-900 md:text-5xl">
          A transparent fundraising experience
        </h2>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {flows.map((flow, i) => (
            <div key={i} className="relative rounded-[30px] border border-gray-100 p-8">
              <div className="absolute -top-5 left-1/2 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full bg-customPrimary text-sm font-bold text-white">
                {i + 1}
              </div>

              <h3 className="mt-6 text-xl font-semibold text-gray-900">
                {flow.title}
              </h3>

              <p className="mt-4 text-sm leading-relaxed text-gray-500">
                {flow.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DonationFlow;

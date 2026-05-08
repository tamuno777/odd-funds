import Image from "next/image";

const features = [
  "Secure payment processing",
  "Real-time donation tracking",
  "Fast campaign approval",
  "Transparent payout system",
  "Mobile-friendly fundraising",
  "Supporter engagement tools",
];

const HowFeatures = () => {
  return (
    <section className="bg-gray-50 py-20 px-6 lg:px-16">
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
        <div className="text-center lg:text-left">
          <span className="text-sm font-semibold uppercase tracking-widest text-customPrimary">
            Built for trust
          </span>

          <h2 className="mt-4 text-3xl font-bold leading-tight text-gray-900 md:text-5xl">
            Everything you need to run a successful campaign
          </h2>

          <p className="mt-6 text-base leading-relaxed text-gray-600 md:text-lg">
            From campaign creation to payouts, OddFund provides the tools needed to fundraise confidently and transparently.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {features.map((feature, i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white px-5 py-4 shadow-sm"
              >
                <div className="h-2.5 w-2.5 rounded-full bg-customPrimary" />

                <span className="text-sm font-medium text-gray-700">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative hidden lg:block">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[32px]">
            <Image
              src="/hero1.png"
              alt="How it works"
              fill
              className="object-cover"
            />
          </div>

          <div className="absolute bottom-0 left-0 h-2/3 w-2/3 rounded-[32px] border-[10px] border-white -z-10 translate-x-[-18px] translate-y-[18px]" />
        </div>
      </div>
    </section>
  );
};

export default HowFeatures;

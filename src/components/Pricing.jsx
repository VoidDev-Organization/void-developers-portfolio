import { motion } from "framer-motion";

import { SectionWrapper } from "../hoc";
import SectionHeading from "./SectionHeading";

const packages = [
  {
    name: "Launch",
    audience: "A polished start for a new idea",
    price: "$150 USD",
    priceNote: "Starting at",
    features: [
      "One-page responsive website",
      "Up to 5 content sections",
      "Contact form and social links",
      "Basic search optimization",
      "Two rounds of revisions",
    ],
    action: "Plan a launch",
    href: "#contact",
  },
  {
    name: "Business",
    audience: "A complete web presence built to grow",
    price: "$300 USD",
    priceNote: "Starting at",
    features: [
      "Up to 8 custom-designed pages",
      "Responsive design and interactions",
      "Content management setup",
      "Analytics and search optimization",
      "Launch support and handover",
    ],
    action: "Discuss your website",
    href: "#contact",
    featured: true,
  },
  {
    name: "Custom System",
    audience: "A scalable product shaped around your operation",
    price: "Negotiable",
    priceNote: "Scoped to your requirements",
    features: [
      "Custom web application and workflows",
      "Secure accounts and role-based access",
      "APIs, databases and integrations",
      "Deployment architecture built to scale",
      "Ongoing support options available",
    ],
    action: "Scope a system",
    href: "#contact",
  },
];

const Pricing = () => (
  <>
    <SectionHeading
      kicker="Clear starting points"
      title="Choose your build."
      subtitle="Start with a focused website or work with us on a system designed around your business. Final scope and pricing are agreed before development begins."
    />

    <div className="mt-12 grid grid-cols-1 items-stretch gap-5 md:grid-cols-2 xl:grid-cols-3">
      {packages.map((item, index) => (
        <motion.article
          key={item.name}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.45, delay: index * 0.08 }}
          className={`relative flex h-full flex-col rounded-2xl border p-6 sm:p-7 ${
            item.featured
              ? "border-accent/70 bg-accent/[0.09] shadow-[0_18px_70px_-36px_rgba(124,58,237,0.8)]"
              : "border-white/12 bg-tertiary/70"
          }`}
        >
          {item.featured && (
            <span className="absolute right-5 top-5 rounded-full border border-accent/40 bg-accent/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-accent-bright">
              Popular
            </span>
          )}

          <h3 className="text-sm font-semibold text-accent-bright">{item.name}</h3>
          <p className="mt-2 min-h-12 max-w-[24ch] text-sm leading-6 text-secondary">
            {item.audience}
          </p>

          <div className="mt-7 min-h-[76px]">
            <p className="text-xs text-muted">{item.priceNote}</p>
            <p className="mt-1 break-words text-[clamp(1.5rem,3vw,2rem)] font-semibold leading-tight text-white">
              {item.price}
            </p>
          </div>

          <ul className="mt-6 flex-1 space-y-3 border-t border-white/10 pt-5">
            {item.features.map((feature) => (
              <li key={feature} className="flex gap-3 text-sm leading-6 text-secondary">
                <span aria-hidden="true" className="mt-0.5 text-accent-bright">✓</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <a
            href={item.href}
            className={`mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-bright ${
              item.featured
                ? "bg-accent text-white hover:bg-accent-bright"
                : "border border-white/20 text-white hover:border-accent-bright hover:text-accent-bright"
            }`}
          >
            {item.action} <span aria-hidden="true">↗</span>
          </a>
        </motion.article>
      ))}
    </div>
  </>
);

export default SectionWrapper(Pricing, "pricing");
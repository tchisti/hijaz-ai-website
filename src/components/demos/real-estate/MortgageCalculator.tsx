"use client"

import { useId, useState, type CSSProperties } from "react"

const cad = new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 })
const TERMS = [15, 20, 25, 30]

/** Read a typed value as a number between 0 and max; anything unreadable counts as 0. */
function read(value: string, max: number) {
  const n = Number(value)
  return Number.isFinite(n) && n > 0 ? Math.min(n, max) : 0
}

const LABEL = "text-[11px] font-medium uppercase tracking-[0.2em] text-[#161412]"
const FIELD =
  "w-full min-h-[48px] rounded-none border-0 border-b border-[#161412]/55 bg-transparent px-0 py-2 f-display text-[28px] font-medium leading-none text-[#161412] [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"

export default function MortgageCalculator() {
  const id = useId()
  const [priceText, setPriceText] = useState("899000")
  const [downText, setDownText] = useState("20")
  const [rateText, setRateText] = useState("4.79")
  const [years, setYears] = useState(25)

  const price = read(priceText, 50_000_000)
  const downPct = read(downText, 100)
  const rate = read(rateText, 30)

  // Standard amortization formula: M = P * r(1 + r)^n / ((1 + r)^n - 1)
  const downPayment = (price * downPct) / 100
  const principal = Math.max(price - downPayment, 0)
  const r = rate / 100 / 12
  const n = years * 12
  const growth = Math.pow(1 + r, n)
  const monthly = principal === 0 ? 0 : r === 0 ? principal / n : (principal * r * growth) / (growth - 1)
  const interest = Math.max(monthly * n - principal, 0)

  return (
    <div className="grid border border-[#161412]/20 lg:grid-cols-[1.15fr_1fr]">
      <form
        aria-label="Mortgage payment calculator"
        noValidate
        onSubmit={(e) => e.preventDefault()}
        style={{ "--demo-focus": "#161412" } as CSSProperties}
        className="grid gap-x-8 gap-y-8 bg-[#D9D2C5] p-6 sm:grid-cols-2 sm:p-10"
      >
        <div className="sm:col-span-2">
          <label htmlFor={`${id}-price`} className={LABEL}>
            Home price
          </label>
          <div className="flex items-baseline gap-2">
            <span aria-hidden="true" className="f-display text-[28px] font-medium">$</span>
            <input
              id={`${id}-price`}
              type="number"
              inputMode="numeric"
              min={0}
              step={5000}
              value={priceText}
              onChange={(e) => setPriceText(e.target.value)}
              className={FIELD}
            />
          </div>
        </div>

        <div>
          <label htmlFor={`${id}-down`} className={LABEL}>
            Down payment %
          </label>
          <div className="flex items-baseline gap-2">
            <input
              id={`${id}-down`}
              type="number"
              inputMode="decimal"
              min={0}
              max={100}
              step={1}
              value={downText}
              onChange={(e) => setDownText(e.target.value)}
              className={FIELD}
            />
            <span aria-hidden="true" className="f-display text-[28px] font-medium">%</span>
          </div>
          <input
            type="range"
            aria-label="Down payment %, slider"
            min={5}
            max={50}
            step={1}
            value={Math.min(Math.max(downPct, 5), 50)}
            onChange={(e) => setDownText(e.target.value)}
            className="mt-2 h-11 w-full cursor-pointer accent-[#161412]"
          />
        </div>

        <div>
          <label htmlFor={`${id}-rate`} className={LABEL}>
            Interest rate %
          </label>
          <div className="flex items-baseline gap-2">
            <input
              id={`${id}-rate`}
              type="number"
              inputMode="decimal"
              min={0}
              max={30}
              step={0.05}
              value={rateText}
              onChange={(e) => setRateText(e.target.value)}
              className={FIELD}
            />
            <span aria-hidden="true" className="f-display text-[28px] font-medium">%</span>
          </div>
        </div>

        <fieldset className="sm:col-span-2">
          <legend className={LABEL}>Amortization, years</legend>
          <div className="mt-3 grid grid-cols-4 border border-[#161412]/55">
            {TERMS.map((t) => (
              <label
                key={t}
                className={`flex min-h-[48px] cursor-pointer items-center justify-center border-r border-[#161412]/55 text-[15px] font-normal transition-colors last:border-r-0 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[#161412] ${
                  years === t ? "bg-[#161412] text-[#F6F2EA]" : "text-[#161412] hover:bg-[#F6F2EA]/60"
                }`}
              >
                <input
                  type="radio"
                  name={`${id}-years`}
                  value={t}
                  checked={years === t}
                  onChange={() => setYears(t)}
                  className="sr-only"
                />
                {t}
                <span className="sr-only"> years</span>
              </label>
            ))}
          </div>
        </fieldset>
      </form>

      <div className="flex flex-col p-6 sm:p-10">
        <p className={LABEL}>Estimated monthly payment</p>
        <output
          htmlFor={`${id}-price ${id}-down ${id}-rate`}
          className="f-display mt-3 block text-[clamp(2.75rem,5vw,4.75rem)] font-medium leading-none tracking-[-0.01em] [overflow-wrap:anywhere]"
        >
          {cad.format(monthly)}
        </output>
        <span aria-hidden="true" className="mt-5 block h-px w-16 bg-[#9A7B3F]" />

        <dl className="mt-6 text-[16px]">
          {[
            ["Mortgage amount", cad.format(principal)],
            ["Down payment", cad.format(downPayment)],
            [`Interest over ${years} years`, cad.format(interest)],
          ].map(([term, value]) => (
            <div key={term} className="flex items-baseline justify-between gap-4 border-b border-[#161412]/15 py-3">
              <dt className="text-[#514B43]">{term}</dt>
              <dd className="font-normal tabular-nums">{value}</dd>
            </div>
          ))}
        </dl>

        {downPct > 0 && downPct < 20 && (
          <p className="mt-5 border-l border-[#9A7B3F] pl-4 text-[14px] leading-relaxed text-[#514B43]">
            With less than 20 per cent down, lenders in Canada require mortgage default insurance. Its premium is left out of
            this figure.
          </p>
        )}
        <p className="mt-auto pt-6 text-[14px] leading-relaxed text-[#514B43]">
          This is an estimate for illustration, not financial advice. Property tax, insurance and closing costs are not included.
        </p>
      </div>
    </div>
  )
}

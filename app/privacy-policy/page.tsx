import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Parent AI collects and uses your data in the context of the newsletter.',
  alternates: {
    canonical: 'https://www.parent-ai.eu/privacy-policy',
  },
  openGraph: {
    title: 'Privacy Policy | Parent AI',
    description: 'How Parent AI collects and uses your data in the context of the newsletter.',
    url: 'https://www.parent-ai.eu/privacy-policy',
    type: 'website',
  },
  robots: {
    index: false,
  },
}

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-brun mb-2">Privacy Policy</h1>
      <p className="text-brun-lighter text-sm mb-10">Last updated: May 7, 2026</p>

      <div className="space-y-8 text-brun-light leading-relaxed">

        <p>
          Welcome to Parent AI.
        </p>
        <p>
          This website shares simple experiments to help parents talk about artificial intelligence
          with their children, without screens and without jargon.
        </p>
        <p>
          This page explains what data is collected when you subscribe to the newsletter, why it
          is used, and how you can exercise your rights.
        </p>

        <section>
          <h2 className="text-xl font-bold text-brun mb-3">Who collects the data?</h2>
          <p>The data is collected by:</p>
          <div className="bg-beige-100 rounded-xl p-4 mt-3 text-brun">
            <p className="font-medium">Julien Seurat</p>
            <p>Publisher of Parent AI</p>
            <p>France</p>
            <p>
              Contact email:{' '}
              <a
                href="mailto:hello@parent-ai.eu"
                className="text-terracotta hover:underline"
              >
                hello@parent-ai.eu
              </a>
            </p>
          </div>
          <p className="mt-3">
            I am the data controller for the personal data collected through the newsletter
            subscription form.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-brun mb-3">What data is collected?</h2>
          <p>When you subscribe to the newsletter, I collect only:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>your email address;</li>
            <li>your child&apos;s age range: 3-5, 6-8, 9-11 or 12+.</li>
          </ul>
          <p className="mt-3">
            I do not ask for your child&apos;s name, surname, date of birth, or any sensitive
            information.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-brun mb-3">Why is this data collected?</h2>
          <p>
            Your email address is used only to send you the Parent AI newsletter.
          </p>
          <p className="mt-3">
            Your child&apos;s age range helps me share ideas, examples and activities that are
            more relevant. A parent of a 3-year-old may not need the same suggestions as a
            parent of a 10-year-old.
          </p>
          <p className="mt-3">
            Your data is not sold, rented or shared with commercial partners.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-brun mb-3">What is the legal basis?</h2>
          <p>
            The newsletter subscription is based on your consent.
          </p>
          <p className="mt-3">
            You subscribe voluntarily through the newsletter form. You can withdraw your consent
            at any time by clicking the unsubscribe link included in every email.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-brun mb-3">Who processes the data?</h2>
          <p>
            Emails are sent through{' '}
            <a
              href="https://www.brevo.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-terracotta hover:underline"
            >
              Brevo
            </a>
            , formerly Sendinblue.
          </p>
          <p className="mt-3">
            Brevo acts as a technical data processor to manage newsletter delivery, subscriber
            lists and unsubscribes. According to its documentation, Brevo states that it has GDPR
            compliance measures in place as a data processor and that its database processing and
            storage servers are located in the European Union.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-brun mb-3">How long is the data kept?</h2>
          <p>
            Your email address and the selected age range are kept as long as you remain
            subscribed to the newsletter.
          </p>
          <p className="mt-3">
            If you unsubscribe, you will no longer receive the newsletter. Some information may
            be kept temporarily in an unsubscribe list to make sure you are not added again
            by mistake.
          </p>
          <p className="mt-3">
            You can request full deletion of your data at any time.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-brun mb-3">What are your rights?</h2>
          <p>You can ask at any time to:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>access your personal data;</li>
            <li>correct inaccurate information;</li>
            <li>delete your data;</li>
            <li>object to its use;</li>
            <li>withdraw your consent to receive the newsletter.</li>
          </ul>
          <p className="mt-3">
            To exercise your rights, please write to{' '}
            <a
              href="mailto:hello@parent-ai.eu"
              className="text-terracotta hover:underline"
            >
              hello@parent-ai.eu
            </a>
            . I will do my best to respond quickly. Under the GDPR, a response should generally
            be provided within one month.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-brun mb-3">Unsubscribe</h2>
          <p>
            Every newsletter email includes an unsubscribe link. One click is enough to stop
            receiving the newsletter.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-brun mb-3">Cookies and analytics</h2>
          <p>
            At this stage, the website does not use advertising cookies or third-party analytics
            cookies.
          </p>
          <p className="mt-3">
            The website may use Vercel Analytics to understand visits in a general way. Vercel
            describes this tool as privacy-friendly analytics without cookies. These statistics
            are only used to understand whether the content is being read and to improve
            the website.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-brun mb-3">Changes to this policy</h2>
          <p>
            This privacy policy may be updated if the website changes, for example if new tools
            are added. The update date at the top of this page shows when the text was last
            modified.
          </p>
        </section>

      </div>

      <div className="mt-10 flex flex-col sm:flex-row gap-3">
        <Link
          href="/"
          className="inline-block bg-beige-200 hover:bg-sauge-100 text-brun font-semibold px-6 py-3 rounded-xl transition-colors text-center"
        >
          Back to home
        </Link>
      </div>
    </div>
  )
}

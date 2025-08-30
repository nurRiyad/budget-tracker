export default function Connect() {
  // Mock data - you can move this to a separate data file if needed
  const footerData = {
    authorInterest: "Interested in collaborating on interesting projects? Let's connect!"
  }

  const seoData = {
    mailAddress: "nurriyad@example.com"
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-zinc-100">Connect With Me</h3>
      <p className="text-sm text-gray-600 dark:text-zinc-400 leading-relaxed">
        {footerData.authorInterest}
      </p>

      <a
        href={`mailto:${seoData.mailAddress}`}
        className="inline-block w-full bg-gray-700 hover:bg-gray-800 dark:bg-sky-700 dark:hover:bg-sky-600 text-white dark:text-sky-100 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-[1.02] text-center"
      >
        Send Mail
      </a>
    </div>
  )
}
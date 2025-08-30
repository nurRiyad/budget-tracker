import { Github, Linkedin, Twitter } from "lucide-react"

export default function Developer() {
  // Mock data - you can move this to a separate data file if needed
  const footerData = {
    author: "Al Asad Nur RIyad",
    aboutAuthor: "Full-stack developer passionate about building modern web applications and sharing knowledge through open source."
  }

  const socialLinks = {
    githubLink: "https://github.com/nurriyad",
    linkedinLink: "https://linkedin.com/in/nurriyad",
    twitterLink: "https://twitter.com/nurriyad",
    stackoverflowLink: "https://stackoverflow.com/users/nurriyad"
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-foreground">
        {footerData.author}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {footerData.aboutAuthor}
      </p>
      <div className="flex space-x-3 pt-2">
        <a
          href={socialLinks.githubLink}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 hover:text-foreground transition-all duration-200 hover:scale-105"
          aria-label="Github"
        >
          <Github className="w-4 h-4" />
        </a>
        <a
          href={socialLinks.linkedinLink}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 hover:text-foreground transition-all duration-200 hover:scale-105"
          aria-label="LinkedIn"
        >
          <Linkedin className="w-4 h-4" />
        </a>
        <a
          href={socialLinks.twitterLink}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 hover:text-foreground transition-all duration-200 hover:scale-105"
          aria-label="Twitter"
        >
          <Twitter className="w-4 h-4" />
        </a>
      </div>
    </div>
  )
}